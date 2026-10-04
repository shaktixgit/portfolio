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

FRAMES_DIR = os.path.abspath("scratch_clean_frames")
OUT_PAPER_DIR = os.path.abspath("scratch_clean_paper")
OUT_ALPHA_DIR = os.path.abspath("scratch_clean_alpha")

for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    if os.path.exists(d):
        shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d, exist_ok=True)

# 1. Extract 9.5s @ 24fps
print("--- Step 1: Extracting 9.5s frames ---")
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

# 2. Extract 9.5s audio
AUDIO_WAV = os.path.abspath("scratch_clean_audio.wav")
cmd_audio = [
    FFMPEG, "-y",
    "-t", "9.5",
    "-i", SRC_VIDEO,
    "-vn", "-c:a", "pcm_s16le", AUDIO_WAV
]
subprocess.run(cmd_audio, check=True)

# 3. Process with isnet-general-use + threshold defringing
print("--- Step 2: Processing frames with isnet + edge defringing ---")
session = rembg.new_session("isnet-general-use")
bg_color = np.array([244, 242, 238], dtype=np.float32)

t0 = time.time()
for idx, fname in enumerate(frame_files):
    in_path = os.path.join(FRAMES_DIR, fname)
    img = Image.open(in_path)
    
    # Segment foreground
    out = rembg.remove(img, session=session)
    arr = np.array(out)
    
    # Clean alpha to eliminate background shadow artifacts completely
    alpha = arr[:, :, 3].astype(np.float32)
    alpha_clean = np.where(alpha < 80.0, 0.0, alpha)
    alpha_clean = np.clip((alpha_clean - 80.0) / (255.0 - 80.0) * 255.0, 0.0, 255.0).astype(np.uint8)
    
    # Save clean RGBA for WebM
    clean_rgba = np.dstack([arr[:, :, :3], alpha_clean])
    alpha_img = Image.fromarray(clean_rgba, "RGBA")
    alpha_path = os.path.join(OUT_ALPHA_DIR, fname)
    alpha_img.save(alpha_path, "PNG")
    
    # Composite onto exact #f4f2ee for MP4
    fg = arr[:, :, :3].astype(np.float32)
    a = (alpha_clean.astype(np.float32) / 255.0)[:, :, None]
    comp = (fg * a + bg_color * (1.0 - a)).astype(np.uint8)
    paper_img = Image.fromarray(comp, "RGB")
    paper_path = os.path.join(OUT_PAPER_DIR, fname)
    paper_img.save(paper_path, "PNG")
    
    if (idx + 1) % 20 == 0 or idx == num_frames - 1:
        elapsed = time.time() - t0
        fps = (idx + 1) / elapsed
        remaining = (num_frames - (idx + 1)) / fps if fps > 0 else 0
        print(f"Processed [{idx+1}/{num_frames}] ({fps:.2f} fps, ~{remaining:.0f}s left)")

print("--- Step 3: Encoding hero.mp4 with exact #f4f2ee background ---")
cmd_mp4 = [
    FFMPEG, "-y",
    "-r", "24",
    "-i", os.path.join(OUT_PAPER_DIR, "frame_%04d.png"),
    "-i", AUDIO_WAV,
    "-c:v", "libx264", "-crf", "19", "-preset", "slow", "-pix_fmt", "yuv420p",
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
    w, h = bimg.size
    crop_bust = bimg.crop((int(w * 0.15), int(h * 0.02), int(w * 0.85), int(h * 0.65)))
    crop_bust = crop_bust.resize((480, 600), Image.Resampling.LANCZOS)
    crop_bust.save(BUST_WEBP, "WEBP", quality=92)
    print(f"Updated portrait-bust.webp ({os.path.getsize(BUST_WEBP)} bytes)")

# Cleanup
for d in [FRAMES_DIR, OUT_PAPER_DIR, OUT_ALPHA_DIR]:
    shutil.rmtree(d, ignore_errors=True)
if os.path.exists(AUDIO_WAV):
    os.remove(AUDIO_WAV)

print("ALL ASSETS SUCCESSFULLY RENDERED!")

