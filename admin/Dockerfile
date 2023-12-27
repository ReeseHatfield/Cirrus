FROM node:16-alpine

WORKDIR /admin

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sudo", "./admin.sh"]