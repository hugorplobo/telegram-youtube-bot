FROM node

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

CMD [ "pnpm", "start" ]