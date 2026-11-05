# ---- Stage 1: Build ----
FROM node:24-slim AS build
WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production --output-path=dist

# ---- Stage 2: Serve with Nginx ----
FROM nginx:stable
EXPOSE 4200

RUN rm -f /usr/share/nginx/html/index.html
COPY --from=build /src/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf