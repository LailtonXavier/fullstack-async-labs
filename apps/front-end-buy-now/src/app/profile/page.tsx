'use client';

import { ProductModal } from '@/components/CreateProductModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useUser } from '@/hooks/user/useUser';
import { Mail, Package, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';
import ProductCardOwner from './components/ProductOwner';

export default function ProfilePage() {
  const [openModal, setOpenModal] = useState(false);

  const { user, isLoading, error, refetch } = useUser();

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Header />
        <main className="px-6 pb-20 pt-32 text-center">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Erro ao carregar perfil
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{error}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Tentar novamente
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const productCount = user?.products?.length || 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="px-6 pb-20 pt-32">
        <section className="relative w-2xl mb-16 overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                <User size={40} strokeWidth={1.5} />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {user?.name?.toUpperCase() ?? 'USUÁRIO'}
                </h1>
                <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                    <Mail size={14} /> {user?.email ?? 'email@exemplo.com'}
                  </span>
                  {user?.id && (
                    <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                      <ShieldCheck size={14} /> ID: {String(user.id).slice(0, 8)}...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-100/50 blur-3xl dark:bg-zinc-800/20" />
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="text-zinc-400" />
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Meus Anúncios
              </h2>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {productCount}
              </span>
            </div>
          </div>

          {!user?.products || productCount === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Você ainda não cadastrou nenhum produto
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Comece anunciando seus produtos clicando no botão acima
              </p>
            </div>
          ) : (
            <ProductCardOwner products={user.products} />
          )}
        </section>
      </main>
       <ProductModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          mode='create'
        />
      <Footer />
    </div>
  );
}