# Stage 1: Build
FROM node:20-alpine3.17 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine3.17 AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --production
EXPOSE 8889
CMD ["node", "dist/src/index.js"]