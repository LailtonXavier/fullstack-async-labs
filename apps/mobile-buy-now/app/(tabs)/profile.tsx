import Loading from '@/components/loanding';
import { CreateProductModal } from '@/components/product/create-product-modal';
import { ProductCard } from '@/components/product/product-card';
import { SuccessProduct } from '@/components/product/success-product';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProductProps } from '../core/domain/entities/product';
import { useUser } from '../core/hooks/user/useUser';

const ProfileScreen = () => {
  const { user, refetch, isLoading } = useUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<ProductProps | null>(null);

  if (isLoading && !user) {
    return <Loading />;
  }

  const productsCount = user?.products?.length ?? 0;
  const hasProducts = productsCount > 0;
  const products = user?.products ?? [];

  return (
    <View style={styles.container}>
      <CreateProductModal
        visible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(product) => {
          refetch()
          setIsCreateModalOpen(false);
          setCreatedProduct(product);
        }}
      />   
      <SuccessProduct
        product={createdProduct}
        onClose={() => setCreatedProduct(null)}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/(tabs)/products')}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={{
              uri:
                user?.photo ||
                'https://ui-avatars.com/api/?name=' + user?.name,
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="cube-outline" size={22} color="#6b7280" />
        <View>
          <Text style={styles.cardLabel}>Seus produtos cadastrados</Text>
          <Text style={styles.cardValue}>{productsCount}</Text>
        </View>
        <TouchableOpacity
            style={styles.cta}
            onPress={() => setIsCreateModalOpen(true)}
          >
            <Text style={styles.ctaText}>Novo produto</Text>
          </TouchableOpacity>
      </View>

      {!hasProducts && (
        <View style={styles.empty}>
          <Ionicons name="add-circle-outline" size={48} color="#9ca3af" />
          <Text style={styles.emptyTitle}>
            Você ainda não possui produtos
          </Text>
          <Text style={styles.emptyText}>
            Comece agora criando seu primeiro produto na BUY.NOW.
          </Text>

          <TouchableOpacity
            style={styles.cta}
            onPress={() => setIsCreateModalOpen(true)}
          >
            <Text style={styles.ctaText}>Criar meu primeiro produto</Text>
          </TouchableOpacity>
        </View>
      )}

      {productsCount > 0 && (
      <View style={styles.photosCard}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} previewRouter='profile' />
          )}
        />
      </View>
    )}

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f4',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    margin: 16,
    marginTop: 40,
    marginBottom: 16,
  
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 12,
  },
  
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e5e7eb',
  },
  
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  
  email: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  
  cardLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  empty: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },

  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  cta: {
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  
  ctaText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  photosCard: {
    marginBottom: 32,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  
  photosRow: {
    flexDirection: 'row',
    gap: 12,
  },
  
  photoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  
  productPhoto: {
    width: '100%',
    height: '100%',
  },
  
  moreWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  moreText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },  
});
