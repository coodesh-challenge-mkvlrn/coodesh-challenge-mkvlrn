FROM node:18-alpine as build
WORKDIR /usr/app
COPY . .
COPY ./.env.prod ./.env
RUN yarn install && yarn build

FROM node:18-alpine
WORKDIR /usr/app
COPY ./.env.prod ./.env
COPY --from=build /usr/app/build .
WORKDIR /usr/app/backend
COPY src/backend/package.json .
COPY src/backend/prisma .
COPY src/backend/server/openapi-schemas.json ./server
COPY .env.prod ./.env
RUN yarn install --prod
RUN npx prisma generate
WORKDIR /usr/app/frontend
COPY src/frontend/package.json .
COPY .env.prod ./.env
RUN yarn install --prod
WORKDIR /usr/app
RUN npm i -g pm2
CMD cd backend && npx prisma migrate deploy && cd .. && pm2-runtime start ecosystem.config.js
