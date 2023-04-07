import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async getMessageId(msg: string): Promise<any> {
    console.log(msg, '---');
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://poe.com/api/gql_POST',
          {
            queryName: 'chatHelpers_sendMessageMutation_Mutation',
            variables: {
              chatId: 1462552,
              bot: 'chinchilla',
              query: msg,
              source: null,
              withChatBreak: false,
            },
            query:
              'mutation chatHelpers_sendMessageMutation_Mutation(\n  $chatId: BigInt!\n  $bot: String!\n  $query: String!\n  $source: MessageSource\n  $withChatBreak: Boolean!\n) {\n  messageEdgeCreate(chatId: $chatId, bot: $bot, query: $query, source: $source, withChatBreak: $withChatBreak) {\n    chatBreak {\n      cursor\n      node {\n        id\n        messageId\n        text\n        author\n        suggestedReplies\n        creationTime\n        state\n      }\n      id\n    }\n    message {\n      cursor\n      node {\n        id\n        messageId\n        text\n        author\n        suggestedReplies\n        creationTime\n        state\n        chat {\n          shouldShowDisclaimer\n          id\n        }\n      }\n      id\n    }\n  }\n}\n',
          },
          {
            headers: {
              'poe-formkey': 'c3451bdaaa1b3c6582c03ed21c37b3a7',
              'poe-tchannel': 'poe-chan50-8888-rdsqepjfcrcomimbafdc',
              cookie: 'p-b=wPewebDu3Zk6PftcAcEOVw%3D%3D',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
