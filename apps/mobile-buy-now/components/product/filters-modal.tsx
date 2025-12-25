import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FiltersModalProps {
  showFilters: boolean
  setShowFilters: (value: React.SetStateAction<boolean>) => void
  categories: ({
      label: string;
      value: undefined;
      icon: string;
  } | {
      label: string;
      value: string;
      icon: string;
  })[]
  category: string | undefined
  setCategory: (category?: string) => void
  status: string | undefined
  setStatus: (status?: "ACTIVE" | "INACTIVE" | "ARCHIVED") => void
  localPrice: string
  setLocalPrice: React.Dispatch<React.SetStateAction<string>>
  handleApplyPrice: () => void
  handleResetFilters: () => void
}

export const statuses = [
  { label: 'Todos', value: undefined, icon: 'checkmark-circle' },
  { label: 'Ativo', value: 'ACTIVE', icon: 'checkmark-circle' },
  { label: 'Inativo', value: 'INACTIVE', icon: 'close-circle' },
  { label: 'Arquivado', value: 'ARCHIVED', icon: 'archive' },
];

const FiltersModal = ({categories,category,handleApplyPrice,localPrice,setCategory,setLocalPrice,setShowFilters,setStatus,showFilters,status, handleResetFilters}: FiltersModalProps) => {
  
  return (
  <Modal
    visible={showFilters}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowFilters(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {/* Header do Modal */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filtros</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={28} color="#1a1a1a" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Ionicons name="grid" size={20} color="#000" />
              <Text style={styles.filterLabel}>Category</Text>
            </View>
            <View style={styles.filterOptions}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.label}
                  style={[
                    styles.filterChip,
                    category === cat.value && styles.filterChipActive,
                  ]}
                  onPress={() => setCategory(cat.value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      category === cat.value && styles.filterChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Filtro de Status */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#000" />
              <Text style={styles.filterLabel}>Status</Text>
            </View>
            <View style={styles.filterOptions}>
              {statuses.map((stat) => (
                <TouchableOpacity
                  key={stat.label}
                  style={[
                    styles.filterChip,
                    status === stat.value && styles.filterChipActive,
                  ]}
                  onPress={() => setStatus(stat.value as any)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      status === stat.value && styles.filterChipTextActive,
                    ]}
                  >
                    {stat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Filtro de Preço Mínimo */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Ionicons name="cash" size={20} color="#000" />
              <Text style={styles.filterLabel}>Minimum Price</Text>
            </View>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Ex: 100.00"
                value={localPrice}
                onChangeText={setLocalPrice}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyPrice}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Botões de Ação */}
        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleResetFilters}
          >
            <Ionicons name="refresh" size={20} color="#000" />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyFiltersButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyFiltersText}>Apply Filters</Text>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)};

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
    maxHeight: '85%',
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