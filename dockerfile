# build da aplicação
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# servidor nginx para servir os arquivos
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
