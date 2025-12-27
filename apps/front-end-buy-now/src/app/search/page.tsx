'use client';

import SiderBarSearch from '@/app/search/components/SiderBarSearch';
import TopBarSeach from '@/app/search/components/TopBarSearch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { useProducts } from '@/hooks/product/useProducts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ProductCardSearch from './components/ProductCardSearch';

type StatusValue = "ACTIVE" | "INACTIVE" | "ARCHIVED" | undefined;

export const categories = [
  { label: 'Todos', value: undefined },
  { label: 'Em destaque', value: 'Featured' },
  { label: 'Cadeiras', value: 'Chairs' },
  { label: 'Poltronas', value: 'Armchairs' },
  { label: 'Abajur', value: 'TableLamp' },
  { label: 'Luminária de teto', value: 'CeilingLight' },
  { label: 'Decorações', value: 'Decors' },
  { label: 'Tapetes', value: 'Rugs' },
  { label: 'Almofadas', value: 'Cushions' },
];

export const statuses: { label: string; value: StatusValue }[] = [
  { label: 'Todos', value: undefined },
  { label: 'Ativo', value: 'ACTIVE' },
  { label: 'Inativo', value: 'INACTIVE' },
  { label: 'Arquivado', value: 'ARCHIVED' },
];

export default function SearchPage() {
  const {
    category,
    status,
    price,
    setCategory,
    setStatus,
    setPrice,
    resetFilters,
  } = useProductFiltersStore();

  const { data, isLoading } = useProducts();
  const [localPrice, setLocalPrice] = useState(price || '');


  const handleApplyPrice = () => {
    setPrice(localPrice || undefined);
  };

  const handleResetFilters = () => {
    setLocalPrice('');
    resetFilters();
  };

  return (
    <div className="min-h-screen antialiased text-zinc-900 dark:text-zinc-100 py-10">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key='products'
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="w-full grid md:grid-cols-[260px_1fr] grid-cols-1 gap-12 mb-10 mt-20 px-8">
            <SiderBarSearch
              categories={categories}
              category={category}
              handleApplyPrice={handleApplyPrice}
              handleResetFilters={handleResetFilters}
              localPrice={localPrice}
              setCategory={setCategory}
              setLocalPrice={setLocalPrice}
              setStatus={setStatus}
              statuses={statuses}
              status={status}
            />

            <main>
              <TopBarSeach 
                categories={categories}
                category={category}
                data={data}
              />
              <ProductCardSearch 
                data={data}
                isLoading={isLoading}
              />
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
