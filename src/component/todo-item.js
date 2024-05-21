import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  deleteTodoReducer,
  toggleTodoReducer,
  editTodoReducer,
} from '../redux/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [toogle, setToggle] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodoReducer(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodoReducer(todo.id));
    setToggle(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTodoReducer({ id: todo.id, text: editedText }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={handleToggle} className="toggle">
        {todo.completed ? '✓' : '○'}
      </span>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p>{todo.text}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
