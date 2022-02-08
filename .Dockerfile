FROM node:17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json .env.project .env.me wait.sh ./
COPY src ./src
# RUN npm install @dotenv/cli -g
# RUN dotenv-cli pull
# RUN npm install
COPY node_modules ./node_modules

EXPOSE 4000
CMD  npm start