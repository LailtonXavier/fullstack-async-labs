import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EmptyStateProps {
  handleResetFilters: () => void
}
const EmptyState = ({handleResetFilters}: EmptyStateProps) => {
  return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconContainer}>
          <Ionicons name="search-outline" size={64} color="#666" />
        </View>
        <Text style={styles.emptyStateTitle}>No products found</Text>
        <Text style={styles.emptyStateText}>
          Try adjusting your filters or search for other categories
        </Text>
        <TouchableOpacity style={styles.emptyButton} onPress={handleResetFilters}>
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text style={styles.emptyButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
emptyState: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 80,
  paddingHorizontal: 32,
},
emptyIconContainer: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 24,
},
emptyStateTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#000',
  marginBottom: 8,
},
emptyStateText: {
  fontSize: 15,
  color: '#666',
  textAlign: 'center',
  marginBottom: 32,
  lineHeight: 22,
},
emptyButton: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#000',
  paddingHorizontal: 24,
  paddingVertical: 14,
  borderRadius: 24,
},
emptyButtonText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '600',
}
})

export default EmptyState;