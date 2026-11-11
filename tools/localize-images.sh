#!/usr/bin/env bash
# ------------------------------------------------------------------
# Downloads every image the site still loads from Framer's servers
# (framerusercontent.com) into assets/img/ and rewrites the HTML to
# use the local copies. Run it ONCE, before you cancel Framer.
#
#   cd path/to/celementa-site
#   bash tools/localize-images.sh
#
# Then commit & push the changes (see README.md).
# ------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p assets/img
urls=$(grep -rhoE 'https://framerusercontent\.com/images/[A-Za-z0-9]+\.(png|jpe?g|webp|svg|gif)' --include='*.html' . | sort -u)

count=0
for url in $urls; do
  file="assets/img/$(basename "$url")"
  if [ ! -s "$file" ]; then
    echo "Downloading $(basename "$url")"
    curl -fsSL "$url" -o "$file"
  fi
  count=$((count+1))
done
echo "Images ready: $count"

# Rewrite links in each HTML file, using the right relative depth
find . -name '*.html' -not -path './tools/*' | while read -r f; do
  depth=$(echo "${f#./}" | tr -cd '/' | wc -c | tr -d ' ')
  prefix=""
  for ((i=0; i<depth; i++)); do prefix="../$prefix"; done
  [ "$f" = "./404.html" ] && prefix="/"
  sed -i.bak -E "/og:image/s#https://framerusercontent\.com/images/#https://celementa.com/assets/img/#g; /og:image/!s#https://framerusercontent\.com/images/#${prefix}assets/img/#g" "$f" && rm -f "$f.bak"
done
echo "Done — all pages now use local images in assets/img/."
