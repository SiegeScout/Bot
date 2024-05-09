import { MeiliSearchService } from "@/services/MeiliSearch";
import SlashCommand from "@/structures/SlashCommand";
import config from "@/utils/config";
import { errorEmbed, primaryEmbed } from "@/utils/embeds";
import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const meili = new MeiliSearchService(
  config.MEILISEARCH_HOST,
  config.MEILISEARCH_KEY
);

export default class OperatorCommand extends SlashCommand {
  constructor() {
    super("operator", "Lookup information about a specific operator");
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const operator = interaction.options.getString("operator");

    if (!operator) {
      return void (await interaction.editReply({
        embeds: [
          errorEmbed("", "**Error!** You must provide an operator to look up."),
        ],
      }));
    }

    const operatorData = await meili.fetch("operators", operator);

    if (!operatorData) {
      return void (await interaction.editReply({
        embeds: [
          errorEmbed(
            "",
            "**Error!** Unable to fetch operator from database, try again later."
          ),
        ],
      }));
    }

    const embed = primaryEmbed(operatorData["name"], "")
      .addFields([
        {
          name: "General Information",
          value:
            `**Type:** ${operatorData["side"] == "defense" ? "Defender" : "Attacker"}\n` + `**Introduced:** Season ${operatorData["season"]}\n` +
            `**Organisation:** tba\n` +
            `**Squad:** tba\n`,
          inline: true,
        },
        {
          name: "_ _",
          value: `**Gender:** tba\n` +
            `**Country:** tba\n` +
            `**Height:** tba\n` +
            `**Weight:** tba\n`,
          inline: true,
        },
      ]);

    await interaction.editReply({
      embeds: [embed],
    });
  }

  async build() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("operator")
          .setDescription("The operator to look up")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .toJSON();
  }
}
