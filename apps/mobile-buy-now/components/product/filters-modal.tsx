import { ProductStatus } from '@/app/core/domain/types/product-status.type';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FiltersModalProps {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;

  categories: {
    label: string;
    value?: string;
    icon: string;
  }[];

  category?: string;
  status?: ProductStatus;
  price?: string;

  setCategory: (category?: string) => void;
  setStatus: (status?: ProductStatus) => void;
  setPrice: (price?: string) => void;

  resetFilters: () => void;
}

export const statuses = [
  { label: 'Ativo', value: 'ACTIVE' },
  { label: 'Inativo', value: 'INACTIVE' },
  { label: 'Arquivado', value: 'ARCHIVED' },
];

const FiltersModal = ({
  showFilters,
  setShowFilters,
  categories,
  category,
  setCategory,
  status,
  setStatus,
  price,
  setPrice,
  resetFilters,
}: FiltersModalProps) => {
  const [tempCategory, setTempCategory] = useState(category);
  const [tempStatus, setTempStatus] = useState(status);
  const [tempPrice, setTempPrice] = useState(price ?? '');

  useEffect(() => {
    if (showFilters) {
      setTempCategory(category);
      setTempStatus(status);
      setTempPrice(price ?? '');
    }
  }, [showFilters]);

  const handleApplyFilters = () => {
    setCategory(tempCategory);
    setStatus(tempStatus);
    setPrice(tempPrice || undefined);

    setShowFilters(false);
  };

  const handleClear = () => {
    setTempCategory(undefined);
    setTempStatus(undefined);
    setTempPrice('');

    resetFilters();
    setShowFilters(false);
  };

  return (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Categoria</Text>
              <View style={styles.filterOptions}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      styles.filterChip,
                      tempCategory === cat.value && styles.filterChipActive,
                    ]}
                    onPress={() => setTempCategory(cat.value)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempCategory === cat.value &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.filterOptions}>
                {statuses.map(stat => (
                  <TouchableOpacity
                    key={stat.label}
                    style={[
                      styles.filterChip,
                      tempStatus === stat.value && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setTempStatus(stat.value as any)
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        tempStatus === stat.value &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {stat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Preço mínimo</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Ex: 100.00"
                value={tempPrice}
                onChangeText={setTempPrice}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyFiltersButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyFiltersText}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  filterSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  filterChipText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  applyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  applyFiltersButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#000',
  },
  applyFiltersText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  }
})


export default FiltersModal;