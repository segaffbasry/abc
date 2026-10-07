#!/bin/sh
# Downloads every photograph on the live homepage (GoDaddy's image CDN, original files) into _scrape/img.
# The hero (sunset), the About portrait and rooftop, and the eight gallery photographs. Then run scripts/images.py.
set -e
mkdir -p _scrape/img
B="https://img1.wsimg.com/isteam/ip/a47b546b-2211-470a-a1aa-9b4fdc55cd5d"
for f in "sunset%20image%20LINKEDIN%20POST%201%20(1).jpeg" IMG_7597-99d53e2.jpeg IMG_9262.jpeg \
  IMG_6852.jpeg IMG_6841.jpeg IMG_6835.jpeg IMG_6552.jpeg IMG_6737.jpeg IMG_2318.jpeg IMG_2617.jpeg IMG_7367.jpeg; do
  out=$(echo "$f" | sed 's/%20/_/g;s/[()]//g')
  curl -sL "$B/$f" -o "_scrape/img/$out"
  echo "$out"
done
