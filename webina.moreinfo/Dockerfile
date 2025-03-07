FROM nginx:1.27-alpine
COPY src /usr/share/nginx/html

EXPOSE 80


ENV APP_BIN=/usr/local/bin

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

# Generate healthcheck and log dir
RUN printf "#\!/bin/bash\ncurl -s -f localhost:80/more-info.html || exit 1" > ${APP_BIN}/healthcheck \
 && chmod +x ${APP_BIN}/healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=2 \
        CMD healthcheck