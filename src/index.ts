import { Client, Collection } from 'discord.js';
import logger from '@/utils/logger';
import config from '@/utils/config';

logger.info('Starting SiegeScout...');

import { loadCommands } from './handlers/commands';
import { loadEvents } from './handlers/events';

import type SlashCommand from '@/structures/SlashCommand';

export const start = Date.now();

export const client = new Client({
  intents: [],
  allowedMentions: {
    parse: ['everyone', 'roles'],
  },
});

export const commands: Collection<string, SlashCommand> = new Collection();

logger.info('Loading commands...');
await loadCommands();
logger.info('Loading events...');
await loadEvents();

client.login(config.TOKEN);