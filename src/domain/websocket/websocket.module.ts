import { Module, Global, Logger } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  controllers: [],
  exports: [WebsocketService],
  providers: [WebsocketService, Logger, WebsocketGateway],
})
export class WebsocketModule {}
