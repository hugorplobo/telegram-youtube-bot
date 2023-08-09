import Handler from "./handler";
import { Context } from "grammy";
import ytdl from "ytdl-core";
import { SendAudio } from "./sendAudio";

export default class VerifySize implements Handler {
  private readonly next: Handler;

  public constructor() {
    this.next = new SendAudio();
  }

  public async handle(ctx: Context) {
    const url = ctx.message!.text!;

    try {
      const info = await ytdl.getInfo(url);

      const audioFormat = ytdl.chooseFormat(info.formats, {
        filter: "audioonly",
        quality: "highestaudio",
      });

      const contentLenght = Number(audioFormat.contentLength);
      const sizeInMbs = contentLenght / (1024 * 1024);

      if (sizeInMbs >= 50) {
        await this.sendMaxLenghtErrorMessage(ctx);
      } else {
        await this.next.handle(ctx);
      }
    } catch (error) {
      console.error(error);
      await this.sendUnknownErrorMessage(ctx);
    }
  }

  private async sendUnknownErrorMessage(ctx: Context) {
    await ctx.reply("Ops...\nSomething went wrong, try again!");
  }

  private async sendMaxLenghtErrorMessage(ctx: Context) {
    await ctx.reply("This video exceeds the Telegram's upload limit (50 MB)!");
  }
}
