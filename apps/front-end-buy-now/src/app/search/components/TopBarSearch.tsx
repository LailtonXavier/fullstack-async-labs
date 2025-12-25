import { PaginatedProducts } from '@/core/domain/types/paginated-products.type';
import Link from 'next/link';

interface TopBarSearchProps {
  categories: ({
    label: string;
    value: undefined;
  } | {
      label: string;
      value: string;
  })[]
  category: string | undefined
  data: PaginatedProducts | undefined
}

const TopBarSeach = ({categories, category, data}: TopBarSearchProps) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        <Link href='/'>Home <span className="mx-2">›</span></Link>
        <span className="text-white">
          {categories.find((c) => c.value === category)?.label || 'All'}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        {data?.products?.length || 0} results
      </div>
    </div>
  )
}

export default TopBarSeach;