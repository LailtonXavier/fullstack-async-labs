import Loading from '@/components/loanding';
import { ProductCard } from '@/components/product/product-card-profile';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from '../core/hooks/user/useUser';

const ProfileScreen = () => {
  const { user, isLoading } = useUser();

  if (isLoading && !user) {
    return <Loading />;
  }

  const productsCount = user?.products?.length ?? 0;
  const hasProducts = productsCount > 0;
  const products = user?.products ?? [];
  const previewProducts = products.slice(0, 3);


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
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

      {/* CARD INFO */}
      <View style={styles.card}>
        <Ionicons name="cube-outline" size={22} color="#6b7280" />
        <View>
          <Text style={styles.cardLabel}>Seus produtos cadastrados</Text>
          <Text style={styles.cardValue}>{productsCount}</Text>
        </View>
      </View>

      {/* EMPTY STATE */}
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
            onPress={() => router.push('/(tabs)/products')}
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
        <ProductCard
          product={item}
          onPress={() => {
            // navega para detalhes
          }}
        />
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
    padding: 16,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    gap: 8,
    marginTop: 40,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
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
