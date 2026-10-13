FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++ git curl

WORKDIR /app

RUN curl https://install.meteor.com/ | sh

ENV PATH="/root/.meteor:$PATH"

COPY . .

RUN meteor npm install

RUN meteor build --directory /build --server-only

FROM node:20-alpine AS production

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY --from=builder /build/bundle ./

WORKDIR /app/programs/server

RUN npm install --omit=dev

WORKDIR /app

ENV PORT=10000
ENV ROOT_URL=http://localhost:10000

EXPOSE 10000

CMD ["node", "main.js"]
