
'use client';

import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { ProductModal } from './CreateProductModal';
import { ProductSuccessModal } from './ProductSuccessModal';
import { toast } from 'sonner';
import { tokenStore } from '@/core/infra/store/tokenStore';
import { useProductWebSocket } from '@/hooks/socket/useProductWebSocket';
import { ProductProps } from '@/core/domain/entities/product';

interface JobProgress {
  jobId: string;
  progress: number;
}

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const { setCategory } = useProductFiltersStore();
  const router = useRouter();
  const pathname = usePathname();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<ProductProps | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const accessToken = tokenStore.getAuthData();
  const userId = accessToken?.userId; 

  const handleProductCreated = useCallback((product: ProductProps) => {
    setIsCreating(false);
    setCurrentProgress(0);
    
    setOpenModal(false);
    
    setTimeout(() => {
      setCreatedProduct(product);
      setShowSuccessModal(true);
    }, 300);
  }, []);

  const handleJobProgress = useCallback((progress: JobProgress) => {
    setCurrentProgress(progress.progress);
    setIsCreating(true);
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('❌ Erro ao criar produto:', error);
    setIsCreating(false);
    setCurrentProgress(0);
    
    toast.error('Erro ao criar produto', {
      description: error,
    });
  }, []);

  useProductWebSocket(String(userId), {
    onProductCreated: handleProductCreated,
    onJobProgress: handleJobProgress,
    onError: handleError,
  });

  const handleCategoryClick = () => {
    setCategory(undefined);
    router.push('/search');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const isHomeActive = pathname === '/';
  const isSearchActive = pathname === '/search';

  return (
    <>
      <header className="position fixed top-1 flex items-center justify-between px-6 py-6 w-full z-10">
        <h1 className="text-5xl font-extrabold tracking-tight relative">
          BUY.NOW<span className="ml-2 align-super text-5xl absolute top-0">©</span>
        </h1>

        <nav className="relative overflow-hidden rounded-xl bg-white/10 p-2 shadow-xl backdrop-blur-md backdrop-saturate-150 hidden items-center gap-8 md:flex">
          <Link 
            href='/' 
            className={`text-sm font-medium transition ${
              isHomeActive 
                ? 'opacity-100 font-bold' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            Home
          </Link>
          
          <button
            type='button'
            onClick={handleCategoryClick}
            className={`text-sm font-medium transition ${
              isSearchActive 
                ? 'opacity-100 font-bold' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            Ver Tudo
          </button>

          <button
            className="flex items-center rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black cursor-pointer relative"
            type='button'
            onClick={() => setOpenModal(true)}
            disabled={isCreating}
          >
            {isCreating ? 'Criando...' : 'Novo Produto'}
            <span className="flex h-6 w-6 ml-4 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
              {isCreating ? (
                <span className="animate-spin">⏳</span>
              ) : (
                '+'
              )}
            </span>
            
            {isCreating && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </button>
        </nav>

        <div className='flex gap-2'>
          <button
            type='button'
            onClick={handleProfileClick}
            className="cursor-pointer rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
          >
            Perfil
          </button>
          <LogoutButton />
        </div>
      </header>

      <ProductModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        mode='create'
      />

      <ProductSuccessModal
        isOpen={showSuccessModal}
        product={createdProduct}
        onClose={() => {
          setShowSuccessModal(false);
          setCreatedProduct(null);
        }}
      />

      {isCreating && currentProgress > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-zinc-900/95 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50 shadow-2xl min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">
                  Criando produto...
                </p>
                <p className="text-zinc-400 text-xs">
                  Isso pode levar alguns segundos
                </p>
              </div>
            </div>

            <div className="relative w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${currentProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-zinc-400 text-xs">
                Progresso
              </span>
              <span className="text-emerald-400 text-xs font-semibold">
                {currentProgress}%
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}