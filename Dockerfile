FROM node:22 as builder

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

COPY --from=builder /app/dist /app

RUN mv simple-server.py.txt simple-server.py \
 && sed -i 's/localhost/0.0.0.0/' simple-server.py

EXPOSE 80

CMD ["python3", "simple-server.py","80"]

