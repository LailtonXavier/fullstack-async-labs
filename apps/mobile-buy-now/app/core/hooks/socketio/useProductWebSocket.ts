import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ProductProps } from '../../domain/entities/product';

interface JobProgress {
  jobId: string;
  progress: number;
}

interface UseProductWebSocketCallbacks {
  onProductCreated?: (product: ProductProps) => void;
  onJobProgress?: (progress: JobProgress) => void;
  onError?: (error: string) => void;
}

export const useProductWebSocket = (
  userId: string,
  callbacks?: UseProductWebSocketCallbacks
) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(
      `${process.env.EXPO_PUBLIC_API_URL}/products`,
      {
        query: { userId },
        transports: ['websocket'],
        forceNew: true,
        autoConnect: true,
      }
    );

    socketRef.current = socket;

    socket.on('product:created', (data) => {
      callbacks?.onProductCreated?.(data.product);
    });

    socket.on('job:progress', (data) => {
      callbacks?.onJobProgress?.(data);
    });

    socket.on('product:creation:failed', (data) => {
      console.error('Erro ao criar produto:', data);
      callbacks?.onError?.(data.error);
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [userId, callbacks?.onProductCreated, callbacks?.onJobProgress, callbacks?.onError]);

  return socketRef;
};
