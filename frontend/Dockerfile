FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

RUN chmod 777 node_modules

CMD [ "npm", "run", "dev"]

