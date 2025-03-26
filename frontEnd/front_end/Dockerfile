FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build /app/build

COPY --from=build /app/package*.json /app/

RUN npm install --only=production

EXPOSE 8080

COPY server.js .

CMD ["node", "server.js"]
