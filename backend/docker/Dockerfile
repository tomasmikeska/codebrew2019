FROM node:8
WORKDIR /app

ENV NODE_ENV=production

COPY . .

RUN NODE_ENV=development npm ci && npm run build && rm -rf node_modules/.cache && npm prune --production --no-audit

EXPOSE 3333
CMD [ "npm", "run", "start:prod" ]
