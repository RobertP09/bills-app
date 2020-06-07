FROM node:12.17.0-alpine3.11

EXPOSE 5000

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN mkdir app && chown -R node:node .
USER node
RUN npm install && npm cache clean --force


WORKDIR /node/app

COPY --chown=node:node . .
CMD [ "node", "server.js" ]