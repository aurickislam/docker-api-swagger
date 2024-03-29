FROM node:16-alpine3.14

RUN apk update && apk upgrade && apk add --no-cache curl bash jq

WORKDIR /app

COPY package*.json ./

RUN npm i --production

COPY . .

#EXPOSE 8083

#HEALTHCHECK --interval=2m --timeout=3s CMD curl -f http://127.0.0.1/heartbeat || exit 1
#HEALTHCHECK --interval=10s --timeout=3s CMD node healthcheck.js 'application/json' '{"status":"OK"}' $(curl -f http://127.0.0.1:80/heartbeat) || exit 1
HEALTHCHECK --interval=10s --timeout=3s CMD bash healthcheck.sh || exit 1

CMD [ "npm", "start" ]