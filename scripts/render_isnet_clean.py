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

FRAMES_DIR = os.path.abspath("scratch_isnet_frames")
OUT_PAPER_DIR = os.path.abspath("scratch_isnet_paper")
OUT_ALPHA_DIR = os.path.abspath("scratch_isnet_alpha")

for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    if os.path.exists(d):
        shutil.rmtree(d)
    os.makedirs(d, exist_ok=True)

# 1. Take first 9.5s from intro.mp4, crop head-to-toe centered (500:50:1400:1050 -> width 900, height 1000)
# Scale to 768x960 (aspect 4:5) at 24fps
print("--- Step 1: Extracting 9.5s 24fps frames from original intro.mp4 ---")
crop_filter = "crop=900:1000:510:60,scale=768:960"
cmd_extract = [
    FFMPEG, "-y",
    "-t", "9.5",
    "-i", SRC_VIDEO,
    "-vf", crop_filter,
    "-r", "24",
    os.path.join(FRAMES_DIR, "frame_%04d.png")
]
subprocess.run(cmd_extract, check=True)

frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.endswith(".png")])
num_frames = len(frame_files)
print(f"Extracted {num_frames} frames.")

# 2. Extract audio from intro.mp4 (9.5s)
AUDIO_WAV = os.path.abspath("scratch_audio_isnet.wav")
cmd_audio = [
    FFMPEG, "-y",
    "-t", "9.5",
    "-i", SRC_VIDEO,
    "-vn", "-c:a", "pcm_s16le", AUDIO_WAV
]
subprocess.run(cmd_audio, check=True)

# 3. Process each frame with isnet-general-use
print("--- Step 2: Background removal with isnet-general-use ---")
session = rembg.new_session("isnet-general-use")
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
    
    if (idx + 1) % 15 == 0 or idx == num_frames - 1:
        elapsed = time.time() - t0
        fps = (idx + 1) / elapsed
        remaining = (num_frames - (idx + 1)) / fps if fps > 0 else 0
        print(f"Processed [{idx+1}/{num_frames}] ({fps:.2f} fps, ~{remaining:.0f}s left)")

print("--- Step 3: Encoding hero.mp4 with clean #f4f2ee background ---")
cmd_mp4 = [
    FFMPEG, "-y",
    "-r", "24",
    "-i", os.path.join(OUT_PAPER_DIR, "frame_%04d.png"),
    "-i", AUDIO_WAV,
    "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p",
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
    "-c:v", "libvpx-vp9", "-crf", "28", "-b:v", "0", "-pix_fmt", "yuva420p",
    "-c:a", "libopus", "-b:a", "96k",
    HERO_WEBM
]
subprocess.run(cmd_webm, check=True)
print(f"Generated: {HERO_WEBM} ({os.path.getsize(HERO_WEBM)} bytes)")

# Update portrait-bust.webp from a clear frame
BUST_WEBP = os.path.abspath("public/portrait-bust.webp")
best_frame = os.path.join(OUT_PAPER_DIR, "frame_0030.png")
if os.path.exists(best_frame):
    bimg = Image.open(best_frame)
    # Head to shirt crop (480x600)
    w, h = bimg.size
    crop_bust = bimg.crop((int(w * 0.15), int(h * 0.02), int(w * 0.85), int(h * 0.65)))
    crop_bust = crop_bust.resize((480, 600), Image.Resampling.LANCZOS)
    crop_bust.save(BUST_WEBP, "WEBP", quality=92)
    print(f"Updated portrait-bust.webp ({os.path.getsize(BUST_WEBP)} bytes)")

# Cleanup temporary frames
for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    shutil.rmtree(d, ignore_errors=True)
if os.path.exists(AUDIO_WAV):
    os.remove(AUDIO_WAV)

print("ALL ASSETS GENERATED CLEANLY WITH ISNET!")

