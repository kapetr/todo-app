export type Todo = { id: string; title: string; completed: boolean }
export type State = Todo[]
export type Action =
  | { type: 'add'; id: string; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'edit'; id: string; title: string }
  | { type: 'delete'; id: string }
  | { type: 'clearCompleted' }
