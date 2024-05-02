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
    // if searcgresoluts exeeds 25 results, remove anything after 25
    if (searchResults.hits.length > 25) {
      searchResults.hits = searchResults.hits.slice(0, 25);
    }


    console.log(searchResults.hits.map((hit) => hit['name'] + ' - ' + hit['slug']))

    await interaction.respond(
      searchResults.hits.map((hit) => ({
        name: hit['name'],
        value: hit['id'],
      }))
    );
  }
}
