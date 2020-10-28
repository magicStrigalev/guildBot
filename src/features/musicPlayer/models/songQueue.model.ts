import {
  DMChannel,
  NewsChannel,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from 'discord.js';

import SongModel from './song.model';

class SongQueueModel {
  textChannel: TextChannel | DMChannel | NewsChannel;
  voiceChannel: VoiceChannel;
  songs: SongModel[];
  connection: null | VoiceConnection;
  volume: number;
  playing: boolean;

  constructor(
    textChannel: TextChannel,
    voiceChannel: VoiceChannel,
    connection: null | VoiceConnection,
    songs: SongModel[],
    volume: number,
    playing: boolean
  ) {
    this.textChannel = textChannel;
    this.voiceChannel = voiceChannel;
    this.connection = connection;
    this.songs = songs;
    this.volume = volume;
    this.playing = playing;
  }
}

export default SongQueueModel;
