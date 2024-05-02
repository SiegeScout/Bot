import SlashCommand from "@/structures/SlashCommand";
import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";

export default class OperatorCommand extends SlashCommand {
  constructor() {
    super('operator', 'Lookup information about a specific operator');
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
  }

  async build() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(option =>
        option
          .setName('operator')
          .setDescription('The operator to look up')
          .setRequired(true)
          .setAutocomplete(true)
      )
      .toJSON();
  }
}