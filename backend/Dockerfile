FROM ruby:2.6.3-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apk update && apk add --no-cache \
      curl-dev \
      gcc \
      git \
      g++ \
      libc-dev \
      libxml2-dev \
      mariadb-dev \
      nodejs \
      nodejs-npm \
      make \
      python \
      tzdata \
      vim \
      yarn && \
    rm -rf /var/lib/apt/lists/* \
      /usr/bin/mysql* \
      /usr/lib/mysqld* \
      /usr/local/bundle/cache/* \
      /usr/local/share/.cache/*

RUN mkdir -p /app/backend
ENV APP_DIR /app/backend
WORKDIR $APP_DIR

COPY Gemfile $APP_DIR/Gemfile
COPY Gemfile.lock $APP_DIR/Gemfile.lock
RUN bundle install

COPY . $APP_DIR

EXPOSE 3000
