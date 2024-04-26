import { EmbedBuilder, type ColorResolvable } from "discord.js"

export const primaryEmbed = (title: string, description: string, color: ColorResolvable = 'Green') => {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor(color)
}

export const errorEmbed = (title: string, description: string, color: ColorResolvable = 'Red') => {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor(color)
}