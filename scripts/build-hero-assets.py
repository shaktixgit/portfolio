import os
import sys
import subprocess
import numpy as np
from PIL import Image

# Find ffmpeg binary
try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = "ffmpeg"

SRC_VIDEO = r"C:\Users\shakt\Downloads\intro.mp4"
if not os.path.exists(SRC_VIDEO):
    # fallback to local
    SRC_VIDEO = os.path.abspath("intro.mp4")

OUTPUT_DIR = os.path.abspath("public/hero")
PUBLIC_DIR = os.path.abspath("public")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

MP4_OUT = os.path.join(OUTPUT_DIR, "hero.mp4")
WEBM_OUT = os.path.join(OUTPUT_DIR, "hero.webm")
PORTRAIT_OUT = os.path.join(PUBLIC_DIR, "portrait-bust.webp")
OG_OUT = os.path.join(PUBLIC_DIR, "og.jpg")

print(f"Using FFmpeg: {FFMPEG}")
print(f"Source video: {SRC_VIDEO}")

# 1. Analyze video duration and parameters
# We use crop=800:1000:470:50, scale=768:960
CROP_FILTER = "crop=800:1000:470:50,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
TOTAL_DUR = 10.0
FADE_DUR = 0.5
LOOP_DUR = TOTAL_DUR - FADE_DUR  # 9.5s
OFFSET = TOTAL_DUR - 2 * FADE_DUR  # 9.0s

# Extract raw audio from 0 to 10s as 48kHz 16-bit PCM stereo
RAW_AUDIO_IN = os.path.abspath("scratch_audio_in.raw")
RAW_AUDIO_OUT = os.path.abspath("scratch_audio_loop.raw")
PROCESSED_VIDEO_NO_AUDIO = os.path.abspath("scratch_video_loop.mp4")

try:
    print("--- Step 1: Extracting 10s audio ---")
    cmd_audio = [
        FFMPEG, "-y", "-t", str(TOTAL_DUR), "-i", SRC_VIDEO,
        "-vn", "-f", "s16le", "-ar", "48000", "-ac", "2", RAW_AUDIO_IN
    ]
    subprocess.run(cmd_audio, check=True)

    # Crossfade audio using numpy
    print("--- Step 2: Numpy sample-accurate audio cross-fade ---")
    raw_data = np.fromfile(RAW_AUDIO_IN, dtype=np.int16).reshape(-1, 2)
    sample_rate = 48000
    fade_samples = int(FADE_DUR * sample_rate)
    total_samples = int(TOTAL_DUR * sample_rate)

    # Trim to exact total_samples if slightly longer
    raw_data = raw_data[:total_samples]
    total_samples = len(raw_data)
    fade_samples = int(FADE_DUR * sample_rate)

    # Stream 1 is samples[fade_samples : total_samples]
    # Stream 2 is samples[0 : fade_samples]
    part1 = raw_data[fade_samples:].copy()
    part2 = raw_data[:fade_samples].copy()

    # The tail of part1 (length fade_samples) blends with part2
    tail_len = fade_samples
    w = np.linspace(0.0, 1.0, tail_len, endpoint=False)[:, np.newaxis]

    # Linear or cosine cross-fade
    blended = ((1.0 - w) * part1[-tail_len:].astype(np.float32) + w * part2.astype(np.float32)).astype(np.int16)

    # Result audio is part1[:-tail_len] concatenated with blended
    looped_audio = np.vstack([part1[:-tail_len], blended])
    looped_audio.tofile(RAW_AUDIO_OUT)
    print(f"Looped audio samples: {len(looped_audio)} ({len(looped_audio)/sample_rate:.3f}s)")

    print("--- Step 3: Seamless video loop with xfade ---")
    # Video crossfade:
    # Stream 1: [0.5 to 10.0] duration 9.5s
    # Stream 2: [0.0 to 0.5] duration 0.5s
    # xfade offset = 9.0s, duration = 0.5s
    # Filter graph:
    # [0:v]trim=0:10,setpts=PTS-STARTPTS,crop=800:1000:470:50,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,split=2[v1][v2];
    # [v1]trim=start=0.5:end=10.0,setpts=PTS-STARTPTS[main];
    # [v2]trim=start=0.0:end=0.5,setpts=PTS-STARTPTS[lead];
    # [main][lead]xfade=transition=fade:duration=0.5:offset=9.0,format=yuv420p[vout]
    filter_complex = (
        f"[0:v]trim=0:{TOTAL_DUR},setpts=PTS-STARTPTS,fps=24,{CROP_FILTER},split=2[v1][v2];"
        f"[v1]trim=start={FADE_DUR}:end={TOTAL_DUR},setpts=PTS-STARTPTS,fps=24[main];"
        f"[v2]trim=start=0:end={FADE_DUR},setpts=PTS-STARTPTS,fps=24[lead];"
        f"[main][lead]xfade=transition=fade:duration={FADE_DUR}:offset={OFFSET},format=yuv420p[vout]"
    )

    cmd_video = [
        FFMPEG, "-y", "-i", SRC_VIDEO,
        "-filter_complex", filter_complex,
        "-map", "[vout]",
        "-c:v", "libx264", "-crf", "18", "-preset", "medium",
        PROCESSED_VIDEO_NO_AUDIO
    ]
    subprocess.run(cmd_video, check=True)

    print("--- Step 4: Export hero.mp4 ---")
    # H.264 yuv420p video (CRF 24, -preset slow) with AAC audio at 96 kbps and +faststart
    cmd_mp4 = [
        FFMPEG, "-y",
        "-i", PROCESSED_VIDEO_NO_AUDIO,
        "-f", "s16le", "-ar", "48000", "-ac", "2", "-i", RAW_AUDIO_OUT,
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        MP4_OUT
    ]
    subprocess.run(cmd_mp4, check=True)
    print(f"Generated: {MP4_OUT} ({os.path.getsize(MP4_OUT)} bytes)")

    print("--- Step 5: Export hero.webm ---")
    # VP9 video (CRF 36) with Opus audio at 80 kbps
    cmd_webm = [
        FFMPEG, "-y",
        "-i", PROCESSED_VIDEO_NO_AUDIO,
        "-f", "s16le", "-ar", "48000", "-ac", "2", "-i", RAW_AUDIO_OUT,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        WEBM_OUT
    ]
    subprocess.run(cmd_webm, check=True)
    print(f"Generated: {WEBM_OUT} ({os.path.getsize(WEBM_OUT)} bytes)")

    print("--- Step 6: Create portrait-bust.webp and og.jpg ---")
    # Extract clearest frame at 2.5s
    FRAME_TMP = os.path.abspath("scratch_frame.png")
    cmd_frame = [
        FFMPEG, "-y", "-ss", "00:00:02.500", "-i", SRC_VIDEO,
        "-vframes", "1", FRAME_TMP
    ]
    subprocess.run(cmd_frame, check=True)

    img = Image.open(FRAME_TMP)
    # Target: head-to-shirt crop at 480x600 saved as portrait-bust.webp
    # Center x is ~870, y head starts around 50. Let's crop head to mid-chest/shirt
    # e.g., y: 40 to 640 (height 600), x: 870 - 240 to 870 + 240 = 630 to 1110 (width 480)
    portrait_crop = img.crop((630, 40, 1110, 640))
    portrait_crop.save(PORTRAIT_OUT, "WEBP", quality=92)
    print(f"Generated: {PORTRAIT_OUT} ({os.path.getsize(PORTRAIT_OUT)} bytes)")

    # OG image: 1200x630
    # Clean warm off-white background (#f4f2ee) with hero portrait on right and name/role on left
    og_img = Image.new("RGB", (1200, 630), "#f4f2ee")
    # Place portrait scaled
    og_portrait = portrait_crop.resize((424, 530), Image.Resampling.LANCZOS)
    og_img.paste(og_portrait, (710, 50))
    og_img.save(OG_OUT, "JPEG", quality=90)
    print(f"Generated: {OG_OUT} ({os.path.getsize(OG_OUT)} bytes)")

finally:
    # Cleanup scratch files
    for tmp in [RAW_AUDIO_IN, RAW_AUDIO_OUT, PROCESSED_VIDEO_NO_AUDIO, "scratch_frame.png"]:
        if os.path.exists(tmp):
            try:
                os.remove(tmp)
            except Exception:
                pass

print("Hero video pipeline completed successfully!")
