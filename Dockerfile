FROM node:24-slim
WORKDIR /app
COPY . .
RUN ["npm", "install", "-g", "pnpm@latest-11"]
RUN ["pnpm", "install"]
RUN ["npm", "run", "build"]
CMD ["node", "./build/server.js"]
