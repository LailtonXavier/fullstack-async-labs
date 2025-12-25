'use client'

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key='main-root'
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <main className="mx-auto flex w-full gap-10 px-6 pb-20 pt-10">
            <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 lg:block">
              <Sidebar />
            </aside>

            <section className="flex-1 mt-20">
              <ProductGrid />
            </section>
          </main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
