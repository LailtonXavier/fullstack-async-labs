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
      style: { background: '#10b981', color: '#fff', fontWeight: 500, borderRadius: '12px', padding: '16px' },
    });
    setTimeout(() => setIsWishSent(false), 5000);
  };

  if (!productSelected) return <Loading />;

  const imageUrl = productSelected.photo || DefaultImage.src;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster />
      
      <main className="flex-grow mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-sm">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              )}
              <Image
                src={imageUrl}
                alt={productSelected.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <nav className="mb-6 flex gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">
                Home
              </Link>
              <span>›</span>
              <span className="truncate text-zinc-900 dark:text-zinc-100 font-medium">
                {productSelected.name}
              </span>
            </nav>

            <div className="mb-6">
              <h1 className="mb-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {productSelected.name}
              </h1>
              <p className="text-xs text-zinc-400 font-mono">
                ID: {String(productSelected.id).slice(0, 12)}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100">
                R$ {productSelected.price}
              </p>
            </div>

            <button
              onClick={handleWishClick}
              disabled={isWishSent}
              className={`mb-10 flex w-full items-center justify-between rounded-2xl px-6 py-5 text-lg font-bold transition-all active:scale-[0.98] ${
                isWishSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
              }`}
            >
              <span>
                {isWishSent ? 'Desejo enviado!' : 'Quero este produto agora!'}
              </span>
              
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isWishSent ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {isWishSent ? <Check size={22} /> : <ShoppingCart size={22} />}
              </div>
            </button>

            <div className="space-y-6 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Descrição</h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {productSelected.description || 'Produto exclusivo com design refinado e qualidade excepcional.'}
                </p>
              </div>

              {productSelected.category && (
                <div className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-1.5 dark:bg-zinc-800">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mr-2">Categoria:</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{productSelected.category}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}