FROM node:16
COPY ./gui /usr/src/frontend
COPY ./server /usr/src/server

WORKDIR /usr/src/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/src/server
RUN npm install

CMD ["npm", "start"]
