import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../redux/todoSlice';
import TodoItem from '../todo-item';
import './Todolist.scss';

const Todolist = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="todolist">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Todo List</h2>
        <Link to="/add">
          <button className="btn">Add New List</button>
        </Link>
      </div>

      {/* map all todo lists............... */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todolist;
