import { ProductProps } from '@/app/core/domain/entities/product';
import { useProductFiltersStore } from '@/app/core/store/useProductFiltersStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  product: ProductProps;
  previewRouter: 'profile' | 'home'
}

export function ProductCard({ product, previewRouter }: Props) {
    const router = useRouter();
    const {setProductSelected  } = useProductFiltersStore();

    const handleGoDetails = () => {
      setProductSelected(product);
    
      router.push({
        pathname: '/(tabs)/details',
        params: {
          from: previewRouter,
        },
      });
    };  
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={handleGoDetails} 
    >
      <Image
        source={{
          uri:
            product.photo ||
            'https://via.placeholder.com/600x600/EEEEEE/999999?text=Produto',
        }}
        style={styles.image}
      />

      <View style={styles.infoCard}>
        <View style={styles.textWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>

          <Text style={styles.price}>
            R$ {product.price}
          </Text>
        </View>

        <View style={styles.iconButton}>
          <Ionicons name="add" size={20} color="#111827" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,        
    padding: 16,        
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  image: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },

  infoCard: {
    position: 'absolute',
    bottom: -18,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  textWrapper: {
    flex: 1,
    marginRight: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
