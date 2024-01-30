import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addTodoReducer } from '../../redux/todoSlice';
import './AddTodo.scss';
const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodoReducer({ text: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  return (
    <div className="add-todo">
      <div style={{ display: 'flex', justifyContent:"space-between"}}>
        <h2>Add Todo</h2>
        <Link to="/">
          <button className="btn">List</button>
        </Link>
      </div>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={handleAddTodo} className="btn2">
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
