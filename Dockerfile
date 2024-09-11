FROM node:18 AS builder

WORKDIR /app

COPY ./Front/dist /app/Front/dist
COPY ./SharpDllProxy /app/SharpDllProxy 
COPY ./Server /app/Server
COPY ./default.json /app/default.json

FROM mcr.microsoft.com/dotnet/core/runtime:3.1 AS final

# 安装Node.js
RUN apt-get update && apt-get install -y nodejs

WORKDIR /app

COPY --from=builder /app /app

CMD ["node", "/app/Server/app.js"]