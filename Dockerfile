FROM node:14-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

#EXPOSE 8083

CMD [ "npm", "start" ]