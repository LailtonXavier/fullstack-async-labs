import Loading from '@/components/Loading';
import { ProductProps } from '@/core/domain/entities/product';
import { PaginatedProducts } from '@/core/domain/types/paginated-products.type';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultImage from '@/app/assets/default.png';

interface ProductCardSearchProps {
  isLoading: boolean;
  data: PaginatedProducts | undefined;
}

const ProductCardSearch = ({ data, isLoading }: ProductCardSearchProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { setProductSelected } = useProductFiltersStore();
  const router = useRouter();

  const handleDetailsClick = (product: ProductProps) => {
    setProductSelected(product);
    router.push('/details');
  };

  const handleTouch = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-2">
          {data?.products && data.products.length > 0 ? (
            data.products.map((product: ProductProps) => (
              <div 
                key={product.id} 
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => handleTouch(String(product.id))}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                  {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
                  )}
                  
                  <Image
                    src={product.photo || DefaultImage.src}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 
                      group-hover:scale-105 
                      ${activeId === product.id ? 'scale-105' : ''}`}
                    onLoadingComplete={() => setImageLoaded(true)}
                    quality={85}
                  />

                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 m-4 flex h-48
                      flex-col items-start justify-center rounded-2xl
                      bg-white p-6 shadow-xl transition-all duration-500 ease-out
                      dark:bg-zinc-900
                      /* Desktop: via hover | Mobile: via classe active */
                      opacity-0 translate-y-10 
                      group-hover:opacity-100 group-hover:translate-y-0
                      ${activeId === product.id ? 'opacity-100 translate-y-0' : ''}
                    `}
                  >
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider">
                      {product.name}
                    </h3>
                    <span className="mb-6 text-sm font-light">R$ {product.price}</span>

                    <div className="flex w-full justify-end">
                      <button 
                        className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDetailsClick(product);
                        }}
                      >
                        Ver produto
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
                          ›
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`
                      absolute top-0 flex w-full items-center justify-between p-4 
                      transition-opacity duration-300 
                      group-hover:opacity-0
                      ${activeId === product.id ? 'opacity-0' : 'opacity-100'}
                    `}
                  >
                    <h3 className="text-sm font-medium uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      {product.name}
                    </h3>
                    <span className="text-sm font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      R$ {product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="absolute w-full text-center text-gray-600 dark:text-gray-400">
              Produto não encontrado :(
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ProductCardSearch;