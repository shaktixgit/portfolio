import os
import subprocess
import shutil
import time
import imageio_ffmpeg
import numpy as np
from PIL import Image
import rembg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SRC_VIDEO = r"C:\Users\shakt\Downloads\intro.mp4"
HERO_MP4 = os.path.abspath("public/hero/hero.mp4")
HERO_WEBM = os.path.abspath("public/hero/hero.webm")

FRAMES_DIR = os.path.abspath("scratch_frames")
OUT_PAPER_DIR = os.path.abspath("scratch_frames_paper")
OUT_ALPHA_DIR = os.path.abspath("scratch_frames_alpha")

for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    if os.path.exists(d):
        shutil.rmtree(d)
    os.makedirs(d, exist_ok=True)

# 1. Extract 24fps looped video & audio using previous stable crop
# Total duration = 9.5s (228 frames)
print("--- Step 1: Extracting 9.5s 24fps frames ---")
cmd_extract = [
    FFMPEG, "-y", "-i", HERO_MP4,
    "-r", "24",
    os.path.join(FRAMES_DIR, "frame_%04d.png")
]
subprocess.run(cmd_extract, check=True)

frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.endswith(".png")])
num_frames = len(frame_files)
print(f"Extracted {num_frames} frames.")

# 2. Extract audio from hero.mp4
AUDIO_WAV = os.path.abspath("scratch_audio.wav")
cmd_audio = [
    FFMPEG, "-y", "-i", HERO_MP4,
    "-vn", "-c:a", "pcm_s16le", AUDIO_WAV
]
subprocess.run(cmd_audio, check=True)

# 3. Process frames with u2netp
print("--- Step 2: Background removal with u2netp ---")
session = rembg.new_session("u2netp")
bg_color = (244, 242, 238) # #f4f2ee

t0 = time.time()
for idx, fname in enumerate(frame_files):
    in_path = os.path.join(FRAMES_DIR, fname)
    img = Image.open(in_path)
    
    # Remove background -> RGBA
    rgba = rembg.remove(img, session=session)
    
    # Save RGBA for transparent WebM
    alpha_path = os.path.join(OUT_ALPHA_DIR, fname)
    rgba.save(alpha_path, "PNG")
    
    # Composite onto #f4f2ee for MP4
    paper_img = Image.new("RGB", rgba.size, bg_color)
    paper_img.paste(rgba, mask=rgba.split()[3])
    paper_path = os.path.join(OUT_PAPER_DIR, fname)
    paper_img.save(paper_path, "PNG")
    
    if (idx + 1) % 25 == 0 or idx == num_frames - 1:
        elapsed = time.time() - t0
        fps = (idx + 1) / elapsed
        remaining = (num_frames - (idx + 1)) / fps if fps > 0 else 0
        print(f"Processed [{idx+1}/{num_frames}] ({fps:.1f} fps, ~{remaining:.0f}s left)")

print("--- Step 3: Encoding hero.mp4 with #f4f2ee background ---")
cmd_mp4 = [
    FFMPEG, "-y",
    "-r", "24",
    "-i", os.path.join(OUT_PAPER_DIR, "frame_%04d.png"),
    "-i", AUDIO_WAV,
    "-c:v", "libx264", "-crf", "22", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart",
    HERO_MP4
]
subprocess.run(cmd_mp4, check=True)
print(f"Generated: {HERO_MP4} ({os.path.getsize(HERO_MP4)} bytes)")

print("--- Step 4: Encoding hero.webm with transparent alpha ---")
cmd_webm = [
    FFMPEG, "-y",
    "-r", "24",
    "-i", os.path.join(OUT_ALPHA_DIR, "frame_%04d.png"),
    "-i", AUDIO_WAV,
    "-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-pix_fmt", "yuva420p",
    "-c:a", "libopus", "-b:a", "96k",
    HERO_WEBM
]
subprocess.run(cmd_webm, check=True)
print(f"Generated: {HERO_WEBM} ({os.path.getsize(HERO_WEBM)} bytes)")

# Cleanup
for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    shutil.rmtree(d, ignore_errors=True)
if os.path.exists(AUDIO_WAV):
    os.remove(AUDIO_WAV)

print("Video background removal completed successfully!")
