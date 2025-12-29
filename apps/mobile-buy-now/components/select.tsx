import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Select({
  label,
  value,
  options,
  labelOptions,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labelOptions: Record<string, string>;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.select} onPress={() => setOpen(true)}>
        <Text style={styles.selectLabel}>{label}</Text>
        <Text style={styles.selectValue}>
          {value ? labelOptions[value] : 'Selecione'}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <Pressable style={styles.selectOverlay} onPress={() => setOpen(false)}>
          <View style={styles.selectCard}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.selectOption}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <Text style={styles.selectOptionText}>
                  {labelOptions[opt]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  selectLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },

  selectValue: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },

  selectOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 24,
  },

  selectCard: {
    backgroundColor: '#111',
    borderRadius: 12,
  },

  selectOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },

  selectOptionText: {
    color: '#fff',
    fontSize: 14,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },

  button: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  cancel: {
    backgroundColor: '#333',
    marginRight: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  progress: {
    color: '#22c55e',
    marginTop: 8,
    textAlign: 'center',
  },
});
