FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY guild-crest-web.png /usr/share/nginx/html/guild-crest-web.png
COPY gnome-mapmaker.webp /usr/share/nginx/html/gnome-mapmaker.webp
COPY gnome-engineer.webp /usr/share/nginx/html/gnome-engineer.webp

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
