FROM node:16-alpine 

# # install tree command for file tree graph
# RUN apt-get update && apt-get install -y tree

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start" ]
