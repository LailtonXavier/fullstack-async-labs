import { StyleSheet, Text, View } from 'react-native';
import { Message } from './ChatProps';

export function RenderMessage({ item }: { item: Message }) {
  return (
    <View style={[styles.message, item.isUser ? styles.user : styles.bot]}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.time}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
  },
  text: {
    fontSize: 14,
    color: '#020617',
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.6,
  },
});