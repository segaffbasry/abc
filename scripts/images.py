# Makes the web copies in public/media from the downloads in _scrape/img (see scripts/media.sh).
# Photos stay in natural colour (no tint): clients rejected filtered photography on earlier demos.
# One crop: IMG_6737 is a phone screenshot of Street View, so its status bar and title strip are cut away.
from PIL import Image, ImageOps
import os

SRC, OUT = "_scrape/img", "public/media"
os.makedirs(OUT, exist_ok=True)

def save(name, out, width, crop=None, aspect=None, focus=0.5, q=78):
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, name))).convert("RGB")
    if crop: im = im.crop(crop)
    if aspect:  # centre crop to width/height ratio, sliding horizontally by focus
        w, h = im.size
        if w / h > aspect:
            nw = int(h * aspect); x = int((w - nw) * focus); im = im.crop((x, 0, x + nw, h))
        else:
            nh = int(w / aspect); y = int((h - nh) * focus); im = im.crop((0, y, w, y + nh))
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, out), "WEBP", quality=q, method=6)
    print(out, im.size)

save("sunset_image_LINKEDIN_POST_1_1.jpeg", "hero.webp", 2400)
save("sunset_image_LINKEDIN_POST_1_1.jpeg", "hero-m.webp", 900, aspect=0.62, focus=0.62)
save("sunset_image_LINKEDIN_POST_1_1.jpeg", "hero-poster.jpg".replace(".jpg", ".webp"), 64, q=40)
save("IMG_7597-99d53e2.jpeg", "about-tower.webp", 1200)
save("IMG_9262.jpeg", "about-roof.webp", 1600)
save("IMG_6841.jpeg", "g-portico.webp", 1600)
save("IMG_6552.jpeg", "g-house.webp", 1400)
save("IMG_2318.jpeg", "g-scaffold.webp", 1600)
save("IMG_7367.jpeg", "g-view.webp", 1600)
save("IMG_6852.jpeg", "g-castle.webp", 1600)
save("IMG_2617.jpeg", "g-wrap.webp", 1600)
save("IMG_6835.jpeg", "g-brick.webp", 1600)
save("IMG_6737.jpeg", "g-limerick.webp", 1170, crop=(0, 487, 1170, 1617))
save("IMG_9262.jpeg", "og.jpg".replace(".jpg", ".webp"), 1200, aspect=1.9)
