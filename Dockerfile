FROM node:24-slim
WORKDIR /app
COPY . .
RUN ["npm", "run", "build"]
CMD ["node", "./build/server.js"]
