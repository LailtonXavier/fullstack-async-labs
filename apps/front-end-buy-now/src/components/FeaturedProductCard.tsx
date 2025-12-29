import { ProductProps } from '@/core/domain/entities/product';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultImage from '@/app/assets/default.png';

interface Props {
  product: ProductProps;
}

export default function FeaturedProductCard({ product }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {setProductSelected} = useProductFiltersStore()
  const router = useRouter();

  const imageUrl = product.photo || DefaultImage.src;

  const handleDetailsClick = () => {
    setProductSelected(product);
    router.push('/details');
  };

  const arrow = `>`

  return (
    <div className="relative overflow-hidden rounded-3xl">
       <div className="relative h-[70vh] w-full md:h-[80vh]">
       {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        )}
        <Image
          src={imageUrl || DefaultImage.src}
          alt={product.name || 'Produto em destaque'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
          priority
          quality={90}
        />
      </div>

      <div className="absolute w-full md:min-w-90 bottom-6 right-2 md:right-6 max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <span className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
          Melhor venda
        </span>

        <h2 className="mb-2 text-2xl font-semibold leading-tight">
          {product?.name}
        </h2>

        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        {String(product.description).slice(0, 120)}...
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>

          <button 
            className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black cursor-pointer"
            onClick={handleDetailsClick}
            >
            Ver este produto
            <span className="flex h-6 w-6 text-sm items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
            {arrow}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
