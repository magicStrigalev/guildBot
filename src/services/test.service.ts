import {
  Discord,
  On,
  Client,
  ArgsOf,
  Command,
  CommandMessage,
  CommandNotFound,
} from '@typeit/discord'

@Discord('!')
abstract class TestService {
  @On('message')
  private onMessage(
    [message]: ArgsOf<'message'>,
    client: Client,
    guardPayload: any
  ) {
    if (message.content === 'Dima') return 'Ebashit na teamfight';
  }
  @Command('pasha')
  private ebashit(message: CommandMessage) {
    return 'Ebashit na koronnom SFe!';
  }

  @CommandNotFound()
  private notFound(message: CommandMessage) {
    return 'Command was not found';
  }
}

export default TestService
