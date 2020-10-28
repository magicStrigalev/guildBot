import { CommandMessage } from '@typeit/discord';
import { Message } from 'discord.js';
import ytdl = require('ytdl-core');

import BaseCommand from '../../../helpers/baseCommand';
import SongQueueModel from '../models/songQueue.model';
import SongModel from '../models/song.model';

class Play extends BaseCommand {
  queue: Map<string, SongQueueModel>;
  constructor() {
    super('play', 'Play a song in your channel!');
    this.queue = new Map();
  }

  async execute(message: CommandMessage): Promise<Message> {
    const args = message.content.split(' ').slice(1);
    const serverQueue = this.queue.get(message.guild.id);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        'You need to be in a voice channel to play music!'
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send(
        'I need the permissions to join and speak in your voice channel!'
      );
    }

    const songInfo = await ytdl.getInfo(args[0]);
    const song: SongModel = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
      const songQueue: SongQueueModel = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      this.queue.set(message.guild.id, songQueue);
      songQueue.songs.push(song);

      try {
        const connection = await songQueue.voiceChannel.join();
        songQueue.connection = connection;
        this.play(message, songQueue);
      } catch (err) {
        console.log(err);
        this.queue.delete(message.guild.id);
        message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  private async play(message: CommandMessage, songQueue: SongQueueModel) {
    if (songQueue.songs.length === 0) {
      songQueue.voiceChannel.leave();
      return;
    }

    try {
      songQueue.connection
        .play(ytdl(songQueue.songs[0].url))
        .on('finish', () => {
          songQueue.songs.shift();
          this.play(message, songQueue);
        });
      message.channel.send(`Now playing ${songQueue.songs[0].title}!`);
    } catch (err) {
      console.log(err);
      message.channel.send(err);
    }
  }
}

export default Play;
