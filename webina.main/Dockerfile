FROM node:22 AS builder


WORKDIR /app

COPY . /app

RUN apt update -y && apt install -y zip \
 && sed -i 's/max_old_space_size=4096/max_old_space_size=8192/' package.json

RUN npm install

RUN sed -i 's/say/echo/' utils/build/after_build.sh \
 && sed -i '/google-closure-compiler/ s/./#&/' utils/build/after_build.sh

RUN npm run build


FROM python:3.13-slim

WORKDIR /app

ENV APP_BIN=/usr/local/bin

RUN apt-get clean \
 && apt-get -qq update  -y \
# install nginx
 && apt-get -qq install -y --no-install-recommends  nginx-extras curl \
 && rm -rf /var/lib/apt/lists/*

# Generate healthcheck and log dir
RUN printf "#\!/bin/bash\ncurl -s -f localhost:80/ || exit 1" > ${APP_BIN}/healthcheck \
 && chmod +x ${APP_BIN}/healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=2 \
        CMD healthcheck

COPY --from=builder /app/dist /app

RUN mv simple-server.py.txt simple-server.py \
 && sed -i 's/localhost/0.0.0.0/' simple-server.py

EXPOSE 80

CMD ["python3", "simple-server.py","80"]

