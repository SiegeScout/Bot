import type { AutocompleteInteraction } from "discord.js";
import Event from "@/structures/Event";
import config from "@/utils/config";
import { MeiliSearchService } from "@/services/MeiliSearch";

const meilisearch = new MeiliSearchService(config.MEILISEARCH_HOST, config.MEILISEARCH_KEY);

export default class ChatInteractionEvent extends Event {
  constructor() {
    super('Autocomplete', 'interactionCreate', false);
  }

  async execute(interaction: AutocompleteInteraction) {
    if (!interaction.isAutocomplete()) return;

    const value = interaction.options.getFocused()

    const searchResults = await meilisearch.search('operators', value)

    await interaction.respond(
      searchResults.hits.map((hit) => ({
        name: hit['name'],
        value: hit['id'],
      }))
    );
  }
}
