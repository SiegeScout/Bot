import logger from "@/utils/logger";
import { ActivityType, type Client } from "discord.js";
import Event from "@/structures/Event";
import { start } from "..";

export default class ReadyEvent extends Event {
  constructor() {
    super('BotReady', 'ready', true);
  }

  async execute(client: Client) {
    logger.info(`${client.user?.tag} logged into Discord in ${Date.now() - start}ms`);

    client.user?.setActivity('Rainbow Six Siege', { type: ActivityType.Playing });
  }
}