ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app
EXPOSE 8080
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
CMD ["yarn", "start"]
