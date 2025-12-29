import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export function TypingIndicator() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BUY.NOW está digitando</Text>
      <Animated.Text style={[styles.dots, { opacity }]}>
        ...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 6,
    alignItems: 'center',
  },
  text: {
    color: '#94a3b8',
    fontSize: 12,
  },
  dots: {
    color: '#94a3b8',
    fontSize: 14,
    marginLeft: 2,
  },
});
