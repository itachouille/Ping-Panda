import { REST } from "@discordjs/rest"
import {
  RESTPostAPIChannelMessageResult,
  RESTPostAPICurrentUserCreateDMChannelResult,
  Routes,
  APIEmbed,
} from "discord-api-types/v10"

export class DiscordClient {
  private rest: REST

  constructor(token: string | undefined) {
    this.rest = new REST({ version: "10" }).setToken(token ?? "")
  }

  async createDM(
    userdId: string
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    return this.rest.post(Routes.userChannels(), {
      body: { recipient_id: userdId },
    }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
  }

  async sendEmbed(
    channalId: string,
    embed: APIEmbed
  ): Promise<RESTPostAPIChannelMessageResult> {
    return this.rest.post(Routes.channelMessages(channalId), {
      body: { embeds: [embed] },
    }) as Promise<RESTPostAPIChannelMessageResult>
  }
}
