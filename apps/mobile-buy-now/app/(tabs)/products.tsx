import { useProducts } from '@/app/core/hooks/products/useSearchProducts';
import Loading from '@/components/loanding';
import EmptyState from '@/components/product/empty-state';
import FiltersModal from '@/components/product/filters-modal';
import MenuModal from '@/components/product/menu-modal';
import { ProductCard } from '@/components/product/product-card-profile';
import ProductHeader from '@/components/product/product-header';
import ProductNotFound from '@/components/product/product-not-found';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';
import { useProductFiltersStore } from '../core/store/useProductFiltersStore';

export const categories = [
  { label: 'Todos', value: undefined, icon: 'apps' },
  { label: 'Em destaque', value: 'Featured', icon: 'star' },
  { label: 'Cadeiras', value: 'Chairs', icon: 'square' },
  { label: 'Poltronas', value: 'Armchairs', icon: 'dice' },
  { label: 'Abajur', value: 'TableLamp', icon: 'bulb' },
  { label: 'Luminária', value: 'CeilingLight', icon: 'sunny' },
  { label: 'Decorações', value: 'Decors', icon: 'flower' },
  { label: 'Tapetes', value: 'Rugs', icon: 'grid' },
  { label: 'Almofadas', value: 'Cushions', icon: 'ellipse' },
];

export default function ProductsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [localPrice, setLocalPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    category,
    status,
    price,
    page,
    setCategory,
    setStatus,
    setPrice,
    setPage,
    resetFilters,
  } = useProductFiltersStore();

  const { data, isLoading, isError, error, refetch, isFetching } = useProducts();

  useEffect(() => {
    resetFilters();
  }, []);

  const handleApplyPrice = () => {
    setPrice(localPrice || undefined);
  };

  const handleResetFilters = () => {
    setLocalPrice('');
    resetFilters();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (data && page < data.totalPages && !isFetching) {
      setPage(page + 1);
    }
  };

  const activeFiltersCount = [category, status, price].filter(Boolean).length;

  if (isLoading && !data) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <ProductNotFound error={error} refetch={refetch} key='not-found' />
    );
  }

  return (
    <View style={styles.container}>
      <ProductHeader 
        activeFiltersCount={activeFiltersCount}
        setShowFilters={setShowFilters}
        setShowMenu={setShowMenu}
        key='product-header'
      />
      <MenuModal 
        categories={categories}
        setCategory={setCategory}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        key='menu'
      />
      <FiltersModal 
        categories={categories}
        category={category}
        handleApplyPrice={handleApplyPrice}
        handleResetFilters={handleResetFilters}
        localPrice={localPrice}
        setCategory={setCategory}
        setLocalPrice={setLocalPrice}
        setShowFilters={setShowFilters}
        setStatus={setStatus}
        showFilters={showFilters}
        status={status}
        key='filters'
      />

      <FlatList
        data={data?.products || []}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => String(item.id)}
        numColumns={1}
        contentContainerStyle={styles.productsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={['#000']}
          />
        }
        ListEmptyComponent={EmptyState}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetching && data?.products?.length ? (
            <ActivityIndicator style={styles.footerLoader} color="#000" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f4',
  },
  
  productsList: {
    padding: 16,
  },
  
  footerLoader: {
    marginVertical: 20,
  }
});