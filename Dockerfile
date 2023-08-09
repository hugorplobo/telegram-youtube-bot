FROM node

COPY . .

RUN npm install -g pnpm
RUN pnpm install

CMD [ "pnpm", "run", "dev" ]