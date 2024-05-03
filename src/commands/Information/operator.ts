import { MeiliSearchService } from "@/services/MeiliSearch";
import SlashCommand from "@/structures/SlashCommand";
import config from "@/utils/config";
import { errorEmbed, primaryEmbed } from "@/utils/embeds";
import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";

const meili = new MeiliSearchService(config.MEILISEARCH_HOST, config.MEILISEARCH_KEY);

export default class OperatorCommand extends SlashCommand {
  constructor() {
    super('operator', 'Lookup information about a specific operator');
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const operator = interaction.options.getString('operator')

    if (!operator) {
      return void await interaction.editReply({
        embeds: [errorEmbed('', '**Error!** You must provide an operator to look up.')],
      });
    }

    const operatorData = await meili.fetch('operators', operator)

    if (!operatorData) {
      return void await interaction.editReply({
        embeds: [errorEmbed('', '**Error!** Unable to fetch operator from database, try again later.')],
      });
    }

    const embed = primaryEmbed('', `
    **Name:** ${operatorData['name']}`).setAuthor({ name: operatorData['name'] })

    await interaction.editReply({
      embeds: [embed],
    });
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