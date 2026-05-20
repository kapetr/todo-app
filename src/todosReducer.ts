import type { State, Action } from './types'

export function todosReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const title = action.title.trim()
      if (!title) return state
      return [...state, { id: action.id, title, completed: false }]
    }
    case 'toggle':
      return state.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t)
    case 'edit': {
      const title = action.title.trim()
      if (!title) return state.filter(t => t.id !== action.id)
      return state.map(t => t.id === action.id ? { ...t, title } : t)
    }
    case 'delete':
      return state.filter(t => t.id !== action.id)
    case 'clearCompleted':
      return state.filter(t => !t.completed)
    default:
      return state
  }
}
