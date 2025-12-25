import React, { useEffect, useState } from 'react';
import { CheckCircle2, Sparkles, X, Package } from 'lucide-react';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { ProductProps } from '@/core/domain/entities/product';
import { useRouter } from 'next/navigation';

interface ProductSuccessModalProps {
  isOpen: boolean;
  product: ProductProps | null;
  onClose: () => void;
}

export function ProductSuccessModal({ isOpen, product, onClose }: ProductSuccessModalProps) {
  const [show, setShow] = useState(false);

  const {setProductSelected} = useProductFiltersStore()
  const router = useRouter();  

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen || !product) return null;

  const handleDetailsClick = () => {
    setProductSelected(product);
    router.push('/details');
    handleClose()
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        transition-opacity duration-300
        ${show ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          relative w-full max-w-md mx-4
          transform transition-all duration-500
          ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-2xl rounded-3xl" />
        
        {/* Modal Content */}
        <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl overflow-hidden border border-emerald-500/20">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Header with Animation */}
          <div className="relative px-6 pt-8 pb-6 text-center overflow-hidden">
            {/* Sparkles Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`
                    absolute text-emerald-400/20
                    animate-pulse
                  `}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 16 + 8}px`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Success Icon */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-full p-3">
                <CheckCircle2 className="w-12 h-12 text-white animate-bounce" style={{ animationDuration: '1s' }} />
              </div>
            </div>

            {/* Title */}
            <h2 className="relative text-2xl font-bold text-white mb-2">
              🎉 Parabéns!
            </h2>
            <p className="relative text-zinc-400 text-sm">
              Seu produto foi criado com sucesso
            </p>
          </div>

          {/* Product Info */}
          <div className="px-6 pb-6 space-y-4">
            {/* Product Image */}
            {product.photo && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-800/50 border border-zinc-700/50">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Product Details Card */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-zinc-500 text-xs">
                    Código: {product.productCode}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-700/50">
                {product.price && (
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Preço</p>
                    <p className="text-white font-semibold text-sm">
                      R$ {product.price}
                    </p>
                  </div>
                )}
                {product.category && (
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Categoria</p>
                    <p className="text-white font-semibold text-sm">
                      {product.category}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">
                Produto disponível
              </span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDetailsClick}
              className="
                w-full py-3 px-4 
                bg-gradient-to-r from-emerald-600 to-green-600 
                hover:from-emerald-500 hover:to-green-500
                text-white font-semibold rounded-xl
                transition-all duration-300
                shadow-lg shadow-emerald-500/25
                hover:shadow-emerald-500/40
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              Entendi, quero ver meu produto!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
