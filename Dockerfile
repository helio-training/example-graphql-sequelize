FROM node:8.3.0-alpine
ADD . /code
WORKDIR /code
RUN yarn install
CMD ["yarn", "start"]
