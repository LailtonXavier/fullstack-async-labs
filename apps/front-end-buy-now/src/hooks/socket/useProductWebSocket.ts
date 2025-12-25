import { ProductProps } from '@/core/domain/entities/product';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

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
    const socket = io('http://localhost:3000/products', {
      query: { userId },
    });

    socketRef.current = socket;

    socket.on('product:created', (data) => {
      callbacks?.onProductCreated?.(data.product);
    });

    socket.on('job:progress', (data: JobProgress) => {
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