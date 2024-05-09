import { EmbedBuilder, resolveColor, type ColorResolvable } from "discord.js"

export const primaryEmbed = (title: string, description: string, color: ColorResolvable = resolveColor('#3379BA')) => {
  return new EmbedBuilder().setTitle(title || null).setDescription(description || null).setColor(color)
}

export const errorEmbed = (title: string, description: string, color: ColorResolvable = 'Red') => {
  return new EmbedBuilder().setTitle(title || null).setDescription(description || null).setColor(color)
}