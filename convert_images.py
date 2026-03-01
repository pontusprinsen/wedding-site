# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "pillow",
# ]
# ///
"""Convert all hp-*.jpg files in docs/images to WebP using Pillow.

Usage:
    python convert_images.py

The script will create WebP siblings alongside the originals at quality 80.
"""
from pathlib import Path
from PIL import Image

JPEG_DIR = Path(__file__).parent / "docs" / "images"

if not JPEG_DIR.exists():
    print("Image directory does not exist:", JPEG_DIR)
    exit(1)

for jpg in JPEG_DIR.glob("hp-*.jpg"):
    webp_path = jpg.with_suffix(".webp")
    try:
        with Image.open(jpg) as im:
            im.save(webp_path, "WEBP", quality=80)
        print(f"Converted {jpg.name} -> {webp_path.name}")
    except Exception as e:
        print(f"Failed to convert {jpg.name}: {e}")
