import type { Filter } from '../filterTodos'
import { FilterBar } from './FilterBar'

interface Props {
  activeCount: number
  hasCompleted: boolean
  filter: Filter
  onFilter: (f: Filter) => void
  onClearCompleted: () => void
}

export function Footer({ activeCount, hasCompleted, filter, onFilter, onClearCompleted }: Props) {
  return (
    <footer className="todo-footer">
      <span className="todo-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <FilterBar filter={filter} onFilter={onFilter} />
      {hasCompleted && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  )
}
