"""Generate Instagram-ready JPEG variants of the printable PNGs.

The Instagram Graph API requires JPEG (not PNG) and only accepts aspect ratios between 4:5
(0.8) and 1.91:1. The printables are 800x1035 PNGs (aspect 0.773) — just below 4:5, so a raw
convert would be cropped. This fits each poster, whole and un-cropped, centered on a 1080x1350
(4:5) cream canvas and saves it as JPEG, mirroring the category folders under
``public/printables-ig/`` so each maps to
``https://sissythebutterfly.com/printables-ig/<category>/<name>.jpg``.

Idempotent: overwrites its own outputs. Re-run whenever the printables change.

Run:  uv run --with pillow python scripts/gen-ig-images.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

SRC = Path("public/printables")
DST = Path("public/printables-ig")
CANVAS = (1080, 1350)  # 4:5 — Instagram's tallest supported ratio
CREAM = (255, 252, 245)  # matches the printables' paper tone (_PAPER)
QUALITY = 92


def _to_ig_card(src_png: Path) -> Image.Image:
    poster = Image.open(src_png)
    if poster.mode != "RGB":
        # Flatten any transparency onto cream so JPEG (no alpha) stays on-brand.
        flat = Image.new("RGB", poster.size, CREAM)
        flat.paste(poster, mask=poster.convert("RGBA").split()[-1] if "A" in poster.mode else None)
        poster = flat

    canvas_w, canvas_h = CANVAS
    scale = min(canvas_w / poster.width, canvas_h / poster.height)
    new_size = (round(poster.width * scale), round(poster.height * scale))
    fitted = poster.resize(new_size, Image.LANCZOS)

    card = Image.new("RGB", CANVAS, CREAM)
    offset = ((canvas_w - new_size[0]) // 2, (canvas_h - new_size[1]) // 2)
    card.paste(fitted, offset)
    return card


def main() -> int:
    pngs = sorted(SRC.rglob("*.png"))
    if not pngs:
        raise SystemExit(f"no printables found under {SRC.resolve()}")
    for png in pngs:
        rel = png.relative_to(SRC).with_suffix(".jpg")
        out = DST / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        _to_ig_card(png).save(out, "JPEG", quality=QUALITY, optimize=True)
        print(f"  {out}")
    print(f"generated {len(pngs)} Instagram JPEG cards under {DST}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
