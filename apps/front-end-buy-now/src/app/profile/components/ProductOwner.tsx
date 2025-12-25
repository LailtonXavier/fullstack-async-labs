import { ProductModal } from '@/components/CreateProductModal';
import { ProductProps } from '@/core/domain/entities/product';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct';
import { Edit3, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultImage from '@/app/assets/default.png';

interface ProductCardOwnerProps {
  products: ProductProps[] | undefined
}

const ProductCardOwner = ({ products }: ProductCardOwnerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const deleteProduct = useDeleteProduct();

  const {setProductSelected} = useProductFiltersStore()
  
  const [productStateSelected, setProductStateSelected] = useState<ProductProps>();
  const router = useRouter();

  const handleEditProduct = (data: ProductProps) => {
    setProductStateSelected(data)
    setOpenModal(true)
  }

  const handleDetailsClick = (data: ProductProps) => {
    setProductSelected(data);
    router.push('/details');
  };

  const handleDelete = (productId: string | undefined) => {
    if(productId) {
      deleteProduct.mutate({productId});
    }
  };

  return (
    <>
      <ProductModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        mode='edit'
        initialData={productStateSelected}
        productId={productStateSelected?.id}
      />
    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product: ProductProps) => (
        <div 
          key={product.id} 
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-zinc-100 transition-all hover:shadow-xl dark:bg-zinc-900 dark:border-zinc-800"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={product.photo || DefaultImage.src}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'blur-0' : 'blur-lg'
              }`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
              <div className="flex gap-2 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <button 
                  title="Editar"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-[10px] font-bold uppercase tracking-tighter text-black hover:bg-zinc-100 transition-colors cursor-pointer"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit3 size={14} /> Editar
                </button>
                <button 
                  title="Excluir"
                  className="flex items-center justify-center rounded-lg bg-red-500 p-2.5 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  title="Visualizar"
                  className="flex items-center justify-center rounded-lg bg-zinc-800 p-2.5 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                  onClick={() => handleDetailsClick(product)}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate pr-2">
                {product.name}
              </h3>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                product.status === 'ACTIVE' 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                : 'bg-zinc-100 text-zinc-600'
              }`}>
                {product.status}
              </span>
            </div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              R$ {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductCardOwner;