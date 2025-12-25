import { ProductProps } from '@/app/core/domain/entities/product';
import { useProductFiltersStore } from '@/app/core/store/useProductFiltersStore';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductItemProps {
  item: ProductProps;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const {setProductSelected} = useProductFiltersStore()
  const router = useRouter();

  const handleProductDetails = () => {
    setProductSelected(item)
    router.replace('/(tabs)/details');
  }
  return (
  <TouchableOpacity style={styles.productCard} activeOpacity={0.95}>
    <View style={styles.productImageContainer}>
      <ExpoImage
        source={{ uri: item.photo || 'https://picsum.photos/300/200' }}
        style={styles.productImage}
        contentFit="cover"
        transition={300}
      />
      {item.status === 'INACTIVE' && (
        <View style={styles.inactiveBadge}>
          <Text style={styles.inactiveText}>Out of stock</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleProductDetails} style={styles.addToCartButton}>
        <Ionicons name="add-circle" size={32} color="#000" />
      </TouchableOpacity>
    </View>

    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
    </View>
  </TouchableOpacity>
)};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 280,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  inactiveBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  inactiveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    lineHeight: 26,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
});

export default ProductItem;