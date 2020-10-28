import {
  Discord,
  Command,
  CommandMessage,
  CommandNotFound,
} from '@typeit/discord';
import { Message } from 'discord.js';

import Play from './commands/play';
import Skip from './commands/skip';
import Stop from './commands/stop';
import Pause from './commands/pause';
import Resume from './commands/resume';
import SongQueueModel from './models/songQueue.model';

// TODO: Think about the possibility of improvement!
// TODO: In the future consider doing swap service to change features by commands if you are goind to extend this bot!
// TODO: Very difficult task: try to implement multy-threaded node js to handle working on several servers!
// TODO: deploy it on heroku/Vercel (vercel is more preferable)
@Discord('!')
class MusicPlayer {
  queue: Map<string, SongQueueModel>;
  constructor(
    private readonly play: Play,
    private readonly skip: Skip,
    private readonly stop: Stop,
    private readonly pause: Pause,
    private readonly resume: Resume
  ) {
    this.queue = new Map();
    this.play = new Play();
    this.skip = new Skip();
    this.stop = new Stop();
    this.pause = new Pause();
    this.resume = new Resume();
  }

  @Command('play')
  private async playSongs(message: CommandMessage): Promise<void> {
    await this.play.execute(message, this.queue);
  }

  @Command('skip')
  private async skipSong(message: CommandMessage): Promise<void> {
    await this.skip.execute(message, this.queue);
  }

  @Command('stop')
  private async stopSongs(message: CommandMessage): Promise<void> {
    await this.stop.execute(message, this.queue);
  }

  @Command('pause')
  private async pauseSong(message: CommandMessage): Promise<void> {
    await this.pause.execute(message, this.queue);
  }

  @Command('resume')
  private async resumeSong(message: CommandMessage): Promise<void> {
    await this.resume.execute(message, this.queue);
  }

  @Command('info')
  private getInfo(message: CommandMessage): Promise<Message> {
    const allInfo = `
    !${this.play.name} - ${this.play.description}
!${this.skip.name} - ${this.skip.description}
!${this.stop.name} - ${this.stop.description}
!${this.pause.name} - ${this.pause.description}
!${this.resume.name} - ${this.resume.description}
      `;
    return message.channel.send(allInfo);
  }

  @CommandNotFound()
  private notFound(message: CommandMessage) {
    return message.channel.send('There is no such command!');
  }
}

export default MusicPlayer;
