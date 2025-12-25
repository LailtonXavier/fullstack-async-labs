'use client';

import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { setCategory } = useProductFiltersStore();
  const router = useRouter();

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

  const handleCategoryClick = (slug: string) => {
    setCategory(slug);
    router.push('/search');
  };

  return (
    <div className="flex h-full flex-col justify-between py-6 mt-14 relative">
      <div className="space-y-8">
        <p className="max-w-[220px] text-sm leading-relaxed">
          <em>Refinadas. Minimalistas. Inesquecíveis.</em>
          <br />
          Cadeiras que abraçam o corpo e elevam o ambiente. Onde o design fala baixo, mas a presença se destaca.
        </p>

        <div className='absolute bottom-30'>
          <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide">
            Comprar
          </h4>

          <ul className="space-y-2 text-sm">
            {categories.map(({ label, slug }) => (
              <li key={slug}>
                <button
                  type='button'
                  onClick={() => handleCategoryClick(slug)}
                  className="block cursor-pointer opacity-70 transition hover:opacity-100 text-left w-full"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}