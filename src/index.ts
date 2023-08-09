import "dotenv/config";

import { Bot, Context } from "grammy";
import VerifyURL from "./handlers/verifyURL";

const bot = new Bot(process.env.TOKEN!);
let currentDownloads = new Array<number>();

async function handleMessage(ctx: Context) {
  if (currentDownloads.includes(ctx.from!.id)) {
    await ctx.reply("Hey calm down, only one download at a time!")
  } else {
    currentDownloads = [...currentDownloads, ctx.from!.id];
    await new VerifyURL().handle(ctx);
    currentDownloads = currentDownloads.filter(id => id !== ctx.from!.id);
  }
}

bot.on("message:text", async ctx => {
  handleMessage(ctx);
});

bot.start();