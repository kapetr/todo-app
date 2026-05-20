import { useState, useCallback } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editingTitle, setEditingTitle] = useState<string | null>(null)

  const startEditing = useCallback(() => {
    setEditingTitle(todo.title)
  }, [todo.title])

  const commitEdit = useCallback(() => {
    if (editingTitle === null) return
    onEdit(todo.id, editingTitle)
    setEditingTitle(null)
  }, [editingTitle, onEdit, todo.id])

  const cancelEdit = useCallback(() => {
    setEditingTitle(null)
  }, [])

  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      node.focus()
      node.select()
    }
  }, [])

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {editingTitle !== null ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={editingTitle}
          onChange={e => setEditingTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') commitEdit()
            else if (e.key === 'Escape') cancelEdit()
          }}
          onBlur={commitEdit}
          aria-label={`Edit "${todo.title}"`}
        />
      ) : (
        <span
          className="todo-title"
          onDoubleClick={startEditing}
        >
          {todo.title}
        </span>
      )}
      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
      >
        ×
      </button>
    </li>
  )
}
