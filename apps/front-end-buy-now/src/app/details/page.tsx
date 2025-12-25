'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import DefaultImage from '@/app/assets/default.png';

export default function ProductDetail() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishSent, setIsWishSent] = useState(false);
  const { productSelected } = useProductFiltersStore();

  useEffect(() => {
    if (!productSelected) {
      router.push('/');
    }
  }, [productSelected, router]);

  const handleWishClick = () => {
    if (isWishSent) return;
    
    setIsWishSent(true);
    
    toast.success('Enviamos seu desejo para central!', {
      duration: 4000,
      position: 'top-center',
      icon: '🎯',
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: 500,
        borderRadius: '12px',
        padding: '16px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
    });
    
    setTimeout(() => {
      setIsWishSent(false);
    }, 5000);
  };

  if (!productSelected) {
    return <Loading />;
  }

  const imageUrl = productSelected.photo || DefaultImage.src;

  return (
    <div className="min-h-screen">
      <Header />
      <Toaster />
      
      <div className="mx-auto pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col mt-22 w-xl px-6 py-6">
            <div className="my-10">
              <nav className="flex justify-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Home
                </Link>
                <span>›</span>
                <span className="text-zinc-900 dark:text-zinc-100">{productSelected.name}</span>
              </nav>
            </div>

            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {productSelected.name}
              </h1>
              <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                ID: {String(productSelected.id).slice(0, 8)}...
              </span>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                R$ {productSelected.price}
              </p>
            </div>

            <button
              onClick={handleWishClick}
              disabled={isWishSent}
              className={`mb-12 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-medium transition-all duration-300 cursor-pointer ${
                isWishSent
                  ? 'bg-emerald-600 text-white dark:bg-emerald-700'
                  : 'bg-black text-white hover:opacity-90 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
              }`}
            >
              <span>
                {isWishSent ? 'Desejo enviado!' : 'Quero este produto agora!'}
              </span>
              
              <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isWishSent
                  ? 'bg-white text-emerald-600 dark:bg-emerald-800 dark:text-white'
                  : 'bg-white text-black dark:bg-black dark:text-white'
              }`}>
                {isWishSent ? (
                  <Check size={18} className="animate-pulse" />
                ) : (
                  <ShoppingCart size={18} />
                )}
              </span>
            </button>

            <div className="space-y-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {productSelected.description || 'Produto exclusivo com design refinado e qualidade excepcional.'}
              </p>

              {productSelected.category && (
                <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Categoria:
                    </span>{' '}
                    {productSelected.category}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              )}
              <Image
                src={imageUrl}
                alt={productSelected.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
                priority
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}