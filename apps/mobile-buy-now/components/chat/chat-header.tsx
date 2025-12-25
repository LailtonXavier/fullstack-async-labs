import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ChatHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={26} color="#38bdf8" />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 8}}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#38bdf8" />

        <Text style={styles.text}>
          Chat <Text style={styles.highlight}>BUY.NOW</Text>
      </Text>
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e5e7eb',
  },
  highlight: {
    color: '#38bdf8',
    fontWeight: '700',
  },
});
