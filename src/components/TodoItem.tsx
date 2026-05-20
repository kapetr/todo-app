import type { Todo } from '../types'

interface Props {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <span className="todo-title">{todo.title}</span>
    </li>
  )
}
