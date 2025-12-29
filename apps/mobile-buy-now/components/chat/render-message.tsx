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
    maxWidth: '78%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 6,
  },

  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },

  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderBottomLeftRadius: 4,
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#f8fafc',
  },

  time: {
    fontSize: 10,
    marginTop: 6,
    color: '#94a3b8',
    alignSelf: 'flex-end',
  },
});
