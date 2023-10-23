FROM node:20-bullseye

WORKDIR /usr/src/frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]