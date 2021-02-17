FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install --force

COPY ./ ./

RUN npm run build

EXPOSE 6000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]

#  docker login apiadmin.azurecr.io
#  docker build -t apiadmin.azurecr.io/api-admin:lastest .
#  docker push apiadmin.azurecr.io/api-admin:lastest