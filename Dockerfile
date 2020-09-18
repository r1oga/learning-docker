FROM node:alpine
WORKDIR /home/app
COPY package.json .
RUN npm i
COPY ./ ./
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=0 /home/app/build /usr/share/nginx/html
