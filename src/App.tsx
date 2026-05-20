import { useState } from 'react'
import './index.css'
import { useTodos } from './useTodos'
import { filterTodos } from './filterTodos'
import type { Filter } from './filterTodos'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { Footer } from './components/Footer'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filterTodos(todos, filter)
  const activeCount = todos.filter(t => !t.completed).length
  const hasCompleted = todos.some(t => t.completed)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>todos</h1>
      </header>
      <main className="todo-card">
        <TodoInput onAdd={addTodo} />
        {todos.length === 0 ? (
          <p className="empty-state">Nothing to do — enjoy your day!</p>
        ) : (
          <>
            <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
            <Footer
              activeCount={activeCount}
              hasCompleted={hasCompleted}
              filter={filter}
              onFilter={setFilter}
              onClearCompleted={clearCompleted}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App
