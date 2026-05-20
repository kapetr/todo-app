import type { Filter } from '../filterTodos'

interface Props {
  filter: Filter
  onFilter: (f: Filter) => void
}

const FILTERS: Filter[] = ['all', 'active', 'completed']

export function FilterBar({ filter, onFilter }: Props) {
  return (
    <div className="filter-bar">
      {FILTERS.map(f => (
        <button
          key={f}
          className={`filter-btn${filter === f ? ' active' : ''}`}
          onClick={() => onFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}
