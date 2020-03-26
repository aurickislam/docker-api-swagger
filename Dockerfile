FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8083

CMD [ "node", "app.js" ]
#CMD [ "npm", "run", "start" ]