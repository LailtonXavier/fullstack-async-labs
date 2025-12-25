import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface ShowToastParams {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  position?: 'top' | 'bottom';
  duration?: number;
}

export function useToast() {
  const showToast = useCallback(
    ({
      type,
      title,
      message,
      position = 'top',
      duration = 3000,
    }: ShowToastParams) => {
      Toast.show({
        type,
        text1: title,
        text2: message,
        position,
        visibilityTime: duration,
        autoHide: true,
        topOffset: position === 'top' ? 50 : undefined,
        bottomOffset: position === 'bottom' ? 50 : undefined,
      });
    },
    []
  );

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'success', title, message });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'error', title, message });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'info', title, message });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'warning', title, message });
    },
    [showToast]
  );

  const hideToast = useCallback(() => {
    Toast.hide();
  }, []);

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideToast,
  };
}