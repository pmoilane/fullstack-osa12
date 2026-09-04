FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm list -g --depth=0

USER node

CMD ["npm", "start"]