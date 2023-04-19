import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WebsocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: WebsocketService) {}
  @WebSocketServer() public server: Server;

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    console.log(`Websocket - Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Websocket - Client connected: ${client.id}`);
  }
}
