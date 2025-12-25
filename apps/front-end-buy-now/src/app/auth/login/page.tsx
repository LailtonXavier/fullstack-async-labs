'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '@/app/auth/components/LoginForm';
import AuthHero from '@/app/auth/components/AuthHero';
import RegisterForm from '@/app/auth/components/RegisterForm';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans overflow-hidden">
      <AuthHero isLogin={isLogin} />

      <div className="flex w-full items-center justify-center px-6 lg:w-1/2 bg-zinc-50">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isLogin ? (
                <LoginForm onSwitch={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onSwitch={() => setIsLogin(true)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}