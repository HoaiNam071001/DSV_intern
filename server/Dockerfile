FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3060

CMD ["npm","start"]
