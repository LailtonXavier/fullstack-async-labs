import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProductFiltersStore } from '../core/store/useProductFiltersStore';

export default function DetailsScreen() {
  const router = useRouter();
  const { productSelected: product } = useProductFiltersStore();
  const [modalVisible, setModalVisible] = useState(false);

  if (!product) return null;

  const handleBack = () => {
    router.replace('/(tabs)/products');
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalhes do produto</Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGEM */}
        <View style={styles.imageWrapper}>
          {product.photo ? (
            <Image source={{ uri: product.photo }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#9ca3af" />
            </View>
          )}
        </View>

        {/* CONTEÚDO */}
        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.name}</Text>

          <Text style={styles.price}>R$ {product.price}</Text>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.meta}>
            <Text style={styles.metaText}>Código</Text>
            <Text style={styles.metaValue}>{product.productCode}</Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="heart-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Eu desejo esse produto</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#22c55e" />
            <Text style={styles.modalTitle}>Pedido confirmado!</Text>
            <Text style={styles.modalText}>
              Seu produto será enviado em breve. Obrigado por escolher a BUY.NOW 💙
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    marginTop: 40,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  imageWrapper: {
    height: 280,
    backgroundColor: '#f9fafb',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 16,
  },

  category: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 16,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 20,
  },

  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },

  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },

  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },

  button: {
    height: 52,
    backgroundColor: '#111827',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    color: '#111827',
  },

  modalText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 20,
  },

  modalButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 10,
  },

  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
