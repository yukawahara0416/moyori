FROM node:12.10-stretch-slim

ENV PATH /app/frontend/node_modules/.bin:$PATH
ENV TZ Asia/Tokyo
ENV HOST 0.0.0.0

RUN ln -snf \
      /usr/share/zoneinfo/$TZ \
      /etc/localtime && \
    echo $TZ > /etc/timezone

RUN mkdir -p /app/frontend
ENV APP_DIR /app/frontend
WORKDIR $APP_DIR

COPY package.json $APP_DIR/package.json
COPY yarn.lock $APP_DIR/yarn.lock
RUN yarn install

COPY . $APP_DIR

RUN yarn build:prod

EXPOSE 8080
