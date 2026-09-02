# Build the VitePress site in a reproducible Node image, then serve only the
# generated static files from a small Nginx image.
FROM node:20-alpine AS builder

WORKDIR /site
RUN apk add --no-cache git
COPY package.json package-lock.json ./
RUN npm ci

COPY docs ./docs
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /site/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
