import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ProductHeaderProps {
  setShowMenu: (value: React.SetStateAction<boolean>) => void
  setShowFilters: (value: React.SetStateAction<boolean>) => void
  activeFiltersCount: number
}

const ProductHeader = ({activeFiltersCount,setShowFilters,setShowMenu}: ProductHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logo}>BUY.NOW©</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={24} color="#000" />
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
header: {
  paddingTop: 50,
  paddingBottom: 16,
  paddingHorizontal: 20,
  backgroundColor: '#FAFAFA',
},
headerTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
menuButton: {
  width: 44,
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
},
logo: {
  fontSize: 24,
  fontWeight: '700',
  color: '#000',
  letterSpacing: 1,
},
filterButton: {
  width: 44,
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
filterBadge: {
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: '#000',
  width: 16,
  height: 16,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
filterBadgeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: '700',
}
})

export default ProductHeader;