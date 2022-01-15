FROM node:16-alpine as distPackage
COPY ./ /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn
RUN yarn build


FROM nginx:latest
COPY --from=distPackage /app/dist /usr/share/nginx/html
