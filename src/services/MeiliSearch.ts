import { MeiliSearch } from 'meilisearch';

export class MeiliSearchService {
  private client: MeiliSearch;

  // @ts-ignore
  constructor(private readonly host: string, private readonly key: string) {
    this.client = new MeiliSearch({
      host,
      apiKey: key,
    })
  }

  async index(index: string, data: any) {
    return this.client.index(index).addDocuments([data]);
  }

  async search(index: string, query: string) {
    return this.client.index(index).search(query, { limit: 25 });
  }

  async fetch(index: string, id: string) {
    return this.client.index(index).getDocument(id);
  }
}