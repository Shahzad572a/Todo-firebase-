import { Routes, Route } from 'react-router-dom';
import Todolist from './component/todoList/todo-list';
import AddTodo from './component/addTodo/add-todo';
import Signup from './component/signup/signup';
import Login from './component/login/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todolist />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
