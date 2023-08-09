import Handler from "./handler";
import { Context } from "grammy";
import ytdl from "ytdl-core";
import VerifySize from "./verifySize";

export default class VerifyURL implements Handler {
  private readonly next: Handler;

  public constructor() {
    this.next = new VerifySize();
  }

  public async handle(ctx: Context) {
    const url = ctx.message!.text!;
    const isValidURL = ytdl.validateURL(url);

    if (isValidURL) {
      await this.next.handle(ctx);
    } else {
      await this.sendErrorMessage(ctx);
    }
  }

  private async sendErrorMessage(ctx: Context) {
    await ctx.reply("Invalid URL!");
  }
}
