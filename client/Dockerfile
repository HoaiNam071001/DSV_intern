FROM --platform=linux/amd64 node:16.13.0

WORKDIR /app
COPY package*.json ./
ENV PORT=80
ENV REACT_APP_SERVER="https://namnh.api.internship.designveloper.com"

RUN npm install npm@8.5.3 -g

RUN npm install

COPY . .


CMD ["npm","start"]