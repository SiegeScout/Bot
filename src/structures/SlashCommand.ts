import type { ChatInputCommandInteraction, PermissionResolvable } from "discord.js";

export type SlashCommandOptions = {
  requiredPermissions?: PermissionResolvable[];
  cooldown?: number;
  guildOnly?: boolean;
};

export default class SlashCommand {
  name: string;
  description: string;
  options: SlashCommandOptions | undefined;

  constructor(name: string, description: string, options?: SlashCommandOptions) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  execute(_: ChatInputCommandInteraction) {
    throw new Error("Method not implemented.");
  }
}