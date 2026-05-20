import './index.css'
import { useTodos } from './useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>todos</h1>
      </header>
      <main className="todo-card">
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>
    </div>
  )
}

export default App
