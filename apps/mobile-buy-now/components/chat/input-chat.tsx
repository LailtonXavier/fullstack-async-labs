import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface InputChatProps {
  value: string;
  onMessageChange: (text: string) => void;
  handleSend: () => void;
  isLoading?: boolean;
}

export function InputChat({ value, onMessageChange, handleSend, isLoading }: InputChatProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua dúvida..."
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onMessageChange}
        onSubmitEditing={handleSend}
        editable={!isLoading}
      />

      <TouchableOpacity
        onPress={handleSend}
        disabled={isLoading}
        style={styles.sendButton}
      >
        {isLoading ? (
          <ActivityIndicator color="#f5f5f5" />
        ) : (
          <Ionicons name="send-outline" size={20} color="#38bdf8" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#020617',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#f8fafc',
    height: 44,
    marginRight: 8,
  },
  sendButton: {
    padding: 6,
  },
});
