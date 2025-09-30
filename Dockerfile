FROM oven/bun:1 as build

WORKDIR /app
COPY package*.json bun.lockb* ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
