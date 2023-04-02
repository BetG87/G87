FROM node:18.14.2-alpine

WORKDIR /g87/backend

COPY package*.json ./
RUN npm cache clean --force
Run rm -rf node_modules
RUN npm install

COPY . .

EXPOSE 8000
CMD ["node", "index.js"]