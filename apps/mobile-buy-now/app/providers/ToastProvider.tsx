import React, { ReactNode } from 'react';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#4CAF50', backgroundColor: '#E8F5E9' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1B5E20',
        }}
        text2Style={{
          fontSize: 14,
          color: '#2E7D32',
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#F44336', backgroundColor: '#FFEBEE' }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#B71C1C',
        }}
        text2Style={{
          fontSize: 14,
          color: '#C62828',
        }}
      />
    ),

    info: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#2196F3', backgroundColor: '#E3F2FD' }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#0D47A1',
        }}
        text2Style={{
          fontSize: 14,
          color: '#1565C0',
        }}
      />
    ),

    warning: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#FF9800', backgroundColor: '#FFF3E0' }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#E65100',
        }}
        text2Style={{
          fontSize: 14,
          color: '#EF6C00',
        }}
      />
    ),
  };

  return (
    <>
      {children}
      <Toast config={toastConfig} />
    </>
  );
}