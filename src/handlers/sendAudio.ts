import { Context, InputFile } from "grammy";
import Handler from "./handler";
import ytdl from "ytdl-core";
import fs from "fs";
import fsp from "fs/promises";
import { Message } from "grammy/types";

export class SendAudio implements Handler {
  async handle(ctx: Context) {
    const feedbackMessage = await this.sendFeedbackMessage(ctx);
    const metadata = await ytdl.getBasicInfo(ctx.message!.text!);

    const writingFile = ytdl(ctx.message!.text!, {
      filter: "audioonly",
      quality: "highestaudio",
    })
      .pipe(fs.createWriteStream(`${ctx.from!.id}.mp3`));
    
    writingFile.once("finish", async () => {
      await this.sendFile(ctx, metadata);
      await ctx.api.deleteMessage(ctx.chat!.id, feedbackMessage.message_id);
    });
  }

  private async sendFile(ctx: Context, metadata: ytdl.videoInfo) {
    const readingFile = fs.createReadStream(`${ctx.from!.id}.mp3`);
      await Promise.all([
        ctx.api.sendChatAction(ctx.chat!.id, "upload_voice"),
        ctx.replyWithAudio(new InputFile(readingFile), {
          title: metadata.videoDetails.title,
          duration: Number(metadata.videoDetails.lengthSeconds),
        }),
      ]);

      await fsp.unlink(`${ctx.from!.id}.mp3`);
  }

  private async sendFeedbackMessage(ctx: Context): Promise<Message.TextMessage> {
    return ctx.reply("Downloading! Wait a few seconds please...");
  }
}