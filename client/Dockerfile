FROM node:alpine

WORKDIR /app/client

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx
COPY --from=0 /app/client/build /usr/share/nginx/html
