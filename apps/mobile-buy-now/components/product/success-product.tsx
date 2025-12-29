import { ProductProps } from '@/app/core/domain/entities/product';
import { Image } from 'expo-image';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function SuccessProduct({
  product,
  onClose,
}: {
  product: ProductProps | null;
  onClose: () => void;
}) {
  return (
    <Modal visible={!!product} transparent animationType="fade">
      <View style={styles.successOverlay}>
        <View style={styles.successCard}>

          {product?.photo && (
            <Image
              source={{ uri: product.photo }}
              style={styles.successImage}
            />
          )}

          <Text style={styles.successTitle}>
            Produto criado com sucesso 🎉
          </Text>

          <Text style={styles.successName}>
            {product?.name}
          </Text>

          <Text style={styles.successPrice}>
            R$ {product?.price}
          </Text>

          <TouchableOpacity
            style={styles.successButton}
            onPress={onClose}
          >
            <Text style={styles.successButtonText}>
              Fechar
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  successOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  successCard: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
  },
  
  successImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  
  successTitle: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: '700',
  },
  
  successName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  
  successPrice: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 4,
  },
  
  successButton: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  
  successButtonText: {
    color: '#111',
    fontWeight: '700',
  },
  })
  