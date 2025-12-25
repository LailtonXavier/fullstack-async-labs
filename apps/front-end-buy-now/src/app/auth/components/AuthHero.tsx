import { motion } from 'framer-motion';
import Chair1 from '@/app/assets/chair.webp';
import Chair2 from '@/app/assets/chair2.webp';

export default function AuthHero({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="relative hidden w-1/2 lg:block overflow-hidden">
      <motion.img
        key={isLogin ? 'img-login' : 'img-reg'}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={isLogin 
          ? Chair1.src
          : Chair2.src
        }
        alt="Chair Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-saturate-150" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
        <h1 className="text-4xl font-extrabold tracking-tighter">BUY.NOW©</h1>
        
        <div className="max-w-sm space-y-2">
          <p className="text-lg italic font-light">
            {isLogin 
              ? "Refinadas. Minimalistas. Nunca comuns." 
              : "Sua jornada pelo design começa aqui."}
          </p>
          <p className="text-sm opacity-80">
            {isLogin 
              ? "Cadeiras que falam baixo, mas se destacam alto."
              : "Cadastre-se para acessar ofertas exclusivas e curadoria premium."}
          </p>
        </div>
      </div>
    </div>
  );
}