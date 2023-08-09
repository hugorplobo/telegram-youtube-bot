import { Context } from "grammy";

export default interface Handler {
  handle(ctx: Context): Promise<void>;
};