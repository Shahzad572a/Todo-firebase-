// src/services/firebaseService.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const addTodo = async (todo) => {
    const docRef = await addDoc(collection(firestore, 'todos'), todo);
    return { id: docRef.id, ...todo };
};

export const editTodo = async (id, updatedTodo) => {
  const todoDoc = doc(firestore, 'todos', id);
  await updateDoc(todoDoc, updatedTodo);
  return { id, ...updatedTodo };
};

export const deleteTodo = async (id) => {
  const todoDoc = doc(firestore, 'todos', id);
  await deleteDoc(todoDoc);
  return id;
};

export const toggleTodo = async (id) => {
  const todoDoc = doc(firestore, 'todos', id);
  const todoSnapshot = await getDocs(todoDoc);

  if (todoSnapshot.exists()) {
    const updatedCompleted = !todoSnapshot.data().completed;
    await updateDoc(todoDoc, { completed: updatedCompleted });
    return { id, completed: updatedCompleted };
  }

  return null;
};

export const fetchTodosFromFirebase = async () => {
  const todosCollection = collection(firestore, 'todos');
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
