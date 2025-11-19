# STAGE 1 - Build
FROM node:22.20.0-alpine AS builder
WORKDIR /app
COPY package*.json  .
RUN npm install
RUN npm install typescript@5.9.3
COPY . .
RUN npm run build

#STAGE 2 - Image
FROM node:22.20.0-alpine
WORKDIR /app
COPY --from=builder /app/dist .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "-l", "3000"]


