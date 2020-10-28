import { CommandMessage } from '@typeit/discord';
import { Message } from 'discord.js';

import BaseCommand from '../../../helpers/baseCommand';
import SongQueueModel from '../models/songQueue.model';

class Resume extends BaseCommand {
  constructor() {
    super('resume', 'Resume a song!');
  }

  async execute(
    message: CommandMessage,
    queue: Map<string, SongQueueModel>
  ): Promise<Message> {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(
        'You have to be in a voice channel to resume the music!'
      );
    }
    if (!serverQueue) {
      return message.channel.send('There is no song in queue!');
    }
    if (serverQueue.connection.dispatcher.paused) {
      serverQueue.connection.dispatcher.resume();
      return message.channel.send('Song is resumed');
    } else {
      return message.channel.send('Song is already playing!');
    }
  }
}

export default Resume;
