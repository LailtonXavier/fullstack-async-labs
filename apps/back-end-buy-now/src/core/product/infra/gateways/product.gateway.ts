import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ProductProps } from '../../domain/entities/product.entity';

@WebSocketGateway({
  cors: {
    origin: '*', // Em produção, especifique o domínio do frontend
  },
  namespace: '/products',
})
export class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ProductGateway.name);
  private userSockets = new Map<string, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.userSockets.set(userId, client.id);
      this.logger.log(`Usuário ${userId} associado ao socket ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  notifyProductCreated(userId: string, product: ProductProps) {
    const socketId = this.userSockets.get(userId);
    
    if (socketId) {
      this.server.to(socketId).emit('product:created', {
        success: true,
        product,
        message: 'Produto criado com sucesso!',
      });
      this.logger.log(`Notificação enviada para usuário ${userId}`);
    } else {
      this.logger.warn(`Socket não encontrado para usuário ${userId}`);
    }
  }

  notifyJobProgress(userId: string, jobId: string, progress: number) {
    const socketId = this.userSockets.get(userId);
    
    if (socketId) {
      this.server.to(socketId).emit('job:progress', {
        jobId,
        progress,
      });
    }
  }

  notifyProductCreationFailed(userId: string, jobId: string, error: string) {
    const socketId = this.userSockets.get(userId);
    
    if (socketId) {
      this.server.to(socketId).emit('product:creation:failed', {
        success: false,
        jobId,
        error,
      });
      this.logger.error(`Erro notificado para usuário ${userId}: ${error}`);
    }
  }
}