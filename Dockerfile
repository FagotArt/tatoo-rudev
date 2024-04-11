ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app
EXPOSE 8111
COPY . .

RUN npm install --frozen-lockfile
RUN npm run build
CMD ["npm", "start"]
