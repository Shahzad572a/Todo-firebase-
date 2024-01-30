import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTodo as addTodoToFirebase,
  editTodo as editTodoInFirebase,
  deleteTodo as deleteTodoInFirebase,
  toggleTodo as toggleTodoInFirebase,
  fetchTodosFromFirebase,
} from '../services/firebaseService';

// get data form db 
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await fetchTodosFromFirebase();
  return todos;
});

// add data to db 
export const addTodoReducer = createAsyncThunk('todos/addTodo',async (newTodo) => {
    debugger;
    const addedTodo = await addTodoToFirebase(newTodo);
    return addedTodo;
  }
);

// edit data in db 
export const editTodoReducer = createAsyncThunk('todos/editTodo',async (updatedTodo) => {
    const editedTodo = await editTodoInFirebase(updatedTodo.id, updatedTodo);
    return editedTodo;
  }
);

// delete data from db 
export const deleteTodoReducer = createAsyncThunk('todos/deleteTodo',async (id) => {
    await deleteTodoInFirebase(id);
    return id;
  }
);

export const toggleTodoReducer = createAsyncThunk('todos/toggleTodo',async (id) => {
    const toggledTodo = await toggleTodoInFirebase(id);
    return toggledTodo;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoReducer.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editTodoReducer.fulfilled, (state, action) => {
      const editedTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === editedTodo.id);
      if (index !== -1) {
        state[index] = editedTodo;
      }
    });
    builder.addCase(deleteTodoReducer.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(toggleTodoReducer.fulfilled, (state, action) => {
      const toggledTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === toggledTodo.id);
      if (index !== -1) {
        state[index].completed = toggledTodo.completed;
      }
    });
  },
});

export default todoSlice.reducer;
export const { setTodos } = todoSlice.actions;
