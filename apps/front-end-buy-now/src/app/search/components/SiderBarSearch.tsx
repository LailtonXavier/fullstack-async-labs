import { SetStateAction } from 'react';

interface SiderBarSearchProps {
  handleResetFilters: () => void
  setCategory: (category?: string) => void
  categories: ({
    label: string;
    value: undefined;
  } | {
      label: string;
      value: string;
  })[]
  setStatus: (status?: "ACTIVE" | "INACTIVE" | "ARCHIVED") => void
  statuses: ({
    label: string;
    value: undefined;
  } | {
      label: string;
      value: string;
  })[]
  setLocalPrice: (value: SetStateAction<string>) => void
  handleApplyPrice: () => void
  category: string | undefined
  status: string | undefined
  localPrice: string
}

const SiderBarSearch = ({categories, handleApplyPrice, handleResetFilters, setCategory, setLocalPrice, setStatus, statuses, category, localPrice, status}: SiderBarSearchProps) => {

  return (
    <aside>
      <div className="mt-20 mb-6 flex items-center justify-between border-b-2 border-gray-400">
        <h2 className="text-lg font-medium">Filter</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.label}>
              <button
                onClick={() => setCategory(cat.value)}
                className={`text-sm ${
                  category === cat.value
                    ? 'font-semibold text-white underline underline-offset-4'
                    : 'text-gray-600 hover:text-white'
                }`}
                
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Status
        </h3>
        <ul className="space-y-2">
          {statuses.map((s) => (
            <li key={s.label}>
              <button
                onClick={() => setStatus(s.value)}
                className={`text-sm ${
                  status === s.value
                    ? 'font-semibold text-white underline'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Price
        </h3>

        <div className="flex gap-2">
          <input
            type="number"
            value={localPrice}
            onChange={(e) => setLocalPrice(e.target.value)}
            placeholder="Max"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            onClick={handleApplyPrice}
            className="px-4 py-2 text-sm border border-black hover:bg-black hover:text-white transition"
          >
            OK
          </button>
        </div>
      </div>
    </aside>
  )
}

export default SiderBarSearch;