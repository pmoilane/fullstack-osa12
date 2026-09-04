FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm list

USER node

CMD ["npm", "start"]