FROM node:16.19.1 

USER root

WORKDIR /
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/src/main.js"]

