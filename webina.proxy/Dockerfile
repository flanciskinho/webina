# syntax = docker/dockerfile:experimental

FROM nginx:1.18

ENV APP_BIN=/usr/local/bin

RUN apt-get clean \
 && apt-get -qq update  -y \
# install nginx
 && apt-get -qq install -y --no-install-recommends  nginx-extras curl \
 && rm -rf /var/lib/apt/lists/*

COPY conf/nginx.conf /etc/nginx/
COPY resources/ /usr/share/nginx/html

# Generate healthcheck and log dir
RUN printf "#\!/bin/bash\ncurl -s -f localhost:80/heartbeat || exit 1" > ${APP_BIN}/healthcheck \
 && chmod +x ${APP_BIN}/healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=2 \
        CMD healthcheck

