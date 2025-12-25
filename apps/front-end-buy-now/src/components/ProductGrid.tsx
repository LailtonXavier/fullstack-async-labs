import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { useProducts } from '@/hooks/product/useProducts';
import { useEffect } from 'react';
import FeaturedProductCard from './FeaturedProductCard';
import ProductCard from './ProductCard';
import Loading from './Loading';

export default function ProductGrid() {
  const { data, isLoading } = useProducts();
  const { resetFilters } = useProductFiltersStore();
  
  useEffect(() => {
    resetFilters();;
  }, [resetFilters]);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Nenhum produto encontrado</p>
      </div>
    );
  }

  const [featuredProduct, ...otherProducts] = data.products;

  return (
    <div className="space-y-16">
      {featuredProduct && <FeaturedProductCard product={featuredProduct} />}

      {otherProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {otherProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}