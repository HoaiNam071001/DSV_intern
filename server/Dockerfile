FROM node:16.13.0

ARG MONGGOOSE_URI
ARG JWT_SECRET

WORKDIR /app
COPY package*.json ./

RUN npm install npm@8.5.3 -g
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install

COPY . .

EXPOSE 3060

CMD ["npm","start"]