import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { ChatService } from './chat.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3002, { transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: WebSocket.Server;

  private clients: Set<WebSocket> = new Set();

  afterInit(server: any) {
    console.log('websocket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`clinet connected: ${client}`);
    this.clients.add(client);
  }

  handleDisconnect(client: any) {
    console.log(`clinet disconnected: ${client}`);
    this.clients.delete(client);
  }

  sendMessageToAll(message: any) {
    this.clients.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    Logger.log(`[event]: ${data}`);
    return data;
  }
}
