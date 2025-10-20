/* firestore-api.js - helper functions for Cloud Firestore CRUD ops */
import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Generic helpers for our collections
async function addItem(colName, data) {
  const colRef = collection(db, colName);
  const res = await addDoc(colRef, data);
  return res.id;
}

async function getAll(colName) {
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);
  const docs = [];
  snapshot.forEach(d => docs.push({ id: d.id, ...d.data() }));
  return docs;
}

async function getById(colName, id) {
  const d = await getDoc(doc(db, colName, id));
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() };
}

async function updateItem(colName, id, data) {
  await updateDoc(doc(db, colName, id), data);
  return true;
}

async function deleteItem(colName, id) {
  await deleteDoc(doc(db, colName, id));
  return true;
}

// Specific collections exposed for convenience
const Collections = {
  usuarios: "usuarios",
  estoque: "estoque",
  entradas: "entradas",
  saidas: "saidas",
  vendas: "vendas",
  emails: "emails"
};

export {
  addItem, getAll, getById, updateItem, deleteItem, Collections
};
