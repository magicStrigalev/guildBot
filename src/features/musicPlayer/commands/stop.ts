import { CommandMessage } from '@typeit/discord';
import { Message } from 'discord.js';

import BaseCommand from '../../../helpers/baseCommand';
import SongQueueModel from '../models/songQueue.model';

class Stop extends BaseCommand {
  constructor() {
    super('stop', 'Stop all the songs!');
  }

  async execute(
    message: CommandMessage,
    queue: Map<string, SongQueueModel>
  ): Promise<Message> {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send(
        'You have to be in a voice channel to stop the music!'
      );
    if (serverQueue.connection.dispatcher.paused) {
      serverQueue.connection.dispatcher.resume();
    }
    serverQueue.songs = [];
    queue.clear();
    serverQueue.connection.dispatcher.end();
    return message.channel.send('Music stop playing');
  }
}

export default Stop;
