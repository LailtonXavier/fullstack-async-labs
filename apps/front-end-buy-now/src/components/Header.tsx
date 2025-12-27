
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
import { Menu, Plus, X } from 'lucide-react';

interface JobProgress {
  jobId: string;
  progress: number;
}

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setCategory } = useProductFiltersStore();
  const router = useRouter();
  const pathname = usePathname();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<ProductProps | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const accessToken = tokenStore.getAuthData();
  const userId = accessToken?.userId; 

  const categories = [
    { label: 'Em destaque', slug: 'Featured' },
    { label: 'Cadeiras', slug: 'Chairs' },
    { label: 'Poltronas', slug: 'Armchairs' },
    { label: 'Abajur', slug: 'TableLamp' },
    { label: 'Luminária de teto', slug: 'CeilingLight' },
    { label: 'Decorações', slug: 'Decors' },
    { label: 'Tapetes', slug: 'Rugs' },
    { label: 'Almofadas', slug: 'Cushions' },
  ];

  const handleCategoryClick = (slug?: string) => {
    setCategory(slug);
    router.push('/search');
    setIsMobileMenuOpen(false);
  };

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

  const isHomeActive = pathname === '/';

  return (
    <>
     <header className="fixed top-0 flex items-center justify-between px-4 md:px-6 py-4 md:py-6 w-full z-50 bg-transparent">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight relative z-50">
          BUY.NOW<span className="ml-1 align-super text-xs md:text-5xl md:absolute md:top-0">©</span>
        </h1>

        <nav className="hidden md:flex relative overflow-hidden rounded-xl bg-white/10 p-2 shadow-xl backdrop-blur-md backdrop-saturate-150 items-center gap-8">
          <Link href='/' className={`text-sm font-medium transition ${isHomeActive ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}>
            Home
          </Link>
          <button onClick={() => handleCategoryClick()} className="text-sm font-medium opacity-60 hover:opacity-100 transition">
            Ver Tudo
          </button>
          <button
            className="flex items-center rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
            onClick={() => setOpenModal(true)}
            disabled={isCreating}
          >
            {isCreating ? 'Criando...' : 'Novo Produto'}
            <span className="ml-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {isCreating ? '...' : '+'}
            </span>
          </button>
        </nav>

        <div className='flex items-center gap-2 relative z-50'>
          <button
            onClick={() => router.push('/profile')}
            className="hidden sm:block rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
          >
            Perfil
          </button>
          <div className="hidden sm:block">
            <LogoutButton />
          </div>

          <button 
            className="p-2 md:hidden bg-black/80 text-white rounded-lg backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col h-full p-8 pt-24 text-white">
            <p className="text-sm italic opacity-70 mb-8 border-l-2 border-white/20 pl-4">
              Refinadas. Minimalistas. Inesquecíveis.
            </p>

            <nav className="flex flex-col gap-6 text-2xl font-light">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 text-white cursor-pointer">
                Novo Produto <Plus size={20} />
              </button>
              <hr className="opacity-10" />
              <h4 className="text-xs uppercase tracking-widest opacity-50 font-bold">Categorias</h4>
              <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[40vh]">
                {categories.map((cat) => (
                  <button 
                    key={cat.slug} 
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="text-left text-lg opacity-80 hover:opacity-100"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
               <button onClick={() => {router.push('/profile'); setIsMobileMenuOpen(false)}} className="w-full py-4 bg-white text-black font-bold rounded-xl text-center">Meu Perfil</button>
               <div className='flex gap-2 items-center'>
                  Sair <LogoutButton />
              </div>
            </div>
          </div>
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