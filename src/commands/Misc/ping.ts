import SlashCommand from "@/structures/SlashCommand";
import type { ChatInputCommandInteraction } from "discord.js";

export default class PingCommand extends SlashCommand {
  constructor() {
    super('ping', 'Replies with Pong!');
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
  }
}