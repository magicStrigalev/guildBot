import { CommandMessage } from '@typeit/discord';
import { Message } from 'discord.js';

import BaseCommand from '../../../helpers/baseCommand';
import SongQueueModel from '../models/songQueue.model';

class Skip extends BaseCommand {
  constructor() {
    super('skip', 'Skip a song!');
  }

  async execute(
    message: CommandMessage,
    queue: Map<string, SongQueueModel>
  ): Promise<Message> {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(
        'You have to be in a voice channel to skip the music!'
      );
    }
    if (!serverQueue) {
      return message.channel.send('There is no song in queue!');
    }
    serverQueue.connection.dispatcher.end();
  }
}

export default Skip;
