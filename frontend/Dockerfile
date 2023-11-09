FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

# default vite port :(
EXPOSE 5173 

CMD [ "npm", "run", "dev"]