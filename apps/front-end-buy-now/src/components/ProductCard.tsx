import { ProductProps } from '@/core/domain/entities/product';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultImage from '@/app/assets/default.png';

interface Props {
  product: ProductProps;
}

export default function ProductCard({ product }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {setProductSelected} = useProductFiltersStore()
  const router = useRouter();

  const imageUrl = product.photo || 'https://cdn.shopify.com/s/files/1/0768/2998/2971/files/Verde_armchair_1_11189552-9191-4249-b93e-c4b42704c4be.png?v=1753394061';

  const handleDetailsClick = () => {
    setProductSelected(product);
    router.push('/details');
  };

  const arrow = `>`

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        )}

        <Image
          src={imageUrl || DefaultImage.src}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>


      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-900">
        <div>
          <h3 className="text-sm font-semibold">{product?.name}</h3>
          <p className="text-sm opacity-70">${product.price}</p>
        </div>

        <button
          type='button'
          onClick={handleDetailsClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white font-semibold dark:text-black cursor-pointer"
         >
          {arrow}
        </button>
      </div>
    </div>
  );
}
