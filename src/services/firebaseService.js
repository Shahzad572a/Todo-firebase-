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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app); 

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};



// export const addTodo = async (todo) => {
//   const docRef = await addDoc(collection(firestore, 'todos'), todo);
//   return { id: docRef.id, ...todo };
// };

export const addTodo = async (todo) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const uid = user.uid;
  const userTodosCollection = collection(firestore, 'userTodos', uid, 'todos');
  const docRef = await addDoc(userTodosCollection, todo);
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

export const signup = async (user) => {
  try {
    const { email, password } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signin = async (user) => {
  try {
    const { email, password } = user;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
