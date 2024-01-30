import { Routes, Route } from 'react-router-dom';
import Todolist from './component/todoList/todo-list';
import AddTodo from './component/addTodo/add-todo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todolist />} />
      <Route path="/add" element={<AddTodo />} />
    </Routes>
  );
}

export default App;
