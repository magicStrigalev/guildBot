import * as config from 'config';
import { Client } from '@typeit/discord';

export class Main {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start() {
    this.client = new Client();

    this.client.login(
      config.get('ENV.discordToken'),
      `${__dirname}/services/*.ts`,
      `${__dirname}/services/*.js`
    );
  }
}

Main.start();
