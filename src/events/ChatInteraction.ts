import type { ChatInputCommandInteraction } from "discord.js";
import { commands } from "..";
import Event from "@/structures/Event";

export default class ChatInteractionEvent extends Event {
  constructor() {
    super('ChatInteraction', 'interactionCreate', false);
  }

  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (command) command.execute(interaction);
    }
  }
}