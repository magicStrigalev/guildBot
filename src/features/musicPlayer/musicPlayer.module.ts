import { Discord, Command, CommandMessage } from '@typeit/discord';

import Play from './commands/play';

// TODO: CHANGE OPUSSCRIPT TO DISCORDJS/OPUS
// TODO: In the future consider doing swap service to change features by commands
@Discord('/')
class MusicPlayer {
  constructor(private readonly play: Play) {
    this.play = new Play();
  }

  @Command('play')
  private async playSong(message: CommandMessage): Promise<void> {
    await this.play.execute(message);
  }
}

export default MusicPlayer;
