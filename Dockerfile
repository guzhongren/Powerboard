FROM node:17-alpine as distPackage
COPY ./ /app
WORKDIR /app
RUN npm install -g pnpm && pnpm install && pnpm build


FROM nginx:latest
COPY --from=distPackage /app/dist /usr/share/nginx/html
