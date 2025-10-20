/* main-firebase-integration.js - integrates the site with Firestore
   This file exposes global helper functions you can call from the browser console,
   and tries to attach to forms if they exist (best-effort).
*/
import { addItem, getAll, updateItem, deleteItem, Collections } from "./firestore-api.js";

window.fb = {
  addUsuario: async (data) => {
    const id = await addItem(Collections.usuarios, {...data, criadoEm: new Date()});
    console.log("Usuario criado com id:", id);
    return id;
  },
  listarUsuarios: async () => {
    const items = await getAll(Collections.usuarios);
    console.log("Usuarios:", items);
    return items;
  },
  addEstoque: async (data) => {
    const id = await addItem(Collections.estoque, {...data, criadoEm: new Date()});
    console.log("Estoque criado:", id);
    return id;
  },
  listarEstoque: async () => {
    const items = await getAll(Collections.estoque);
    console.log("Estoque:", items);
    return items;
  },
  addEntrada: async (data) => {
    const id = await addItem(Collections.entradas, {...data, criadoEm: new Date()});
    console.log("Entrada criada:", id);
    return id;
  },
  addSaida: async (data) => {
    const id = await addItem(Collections.saidas, {...data, criadoEm: new Date()});
    console.log("Saida criada:", id);
    return id;
  },
  addVenda: async (data) => {
    const id = await addItem(Collections.vendas, {...data, criadoEm: new Date()});
    console.log("Venda criada:", id);
    return id;
  },
  addEmail: async (data) => {
    const id = await addItem(Collections.emails, {...data, criadoEm: new Date()});
    console.log("Email salvo:", id);
    return id;
  },
  listar: async (colName) => {
    const items = await getAll(colName);
    console.log(colName, items);
    return items;
  }
};

// Auto-attach to common form names/ids (best effort)
document.addEventListener('DOMContentLoaded', () => {
  try {
    const formMap = [
      { selector: 'form#form-usuario', handler: async (form) => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          const data = Object.fromEntries(fd.entries());
          await window.fb.addUsuario(data);
          form.reset();
        });
      }},
      { selector: 'form#form-estoque', handler: async (form) => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          const data = Object.fromEntries(fd.entries());
          await window.fb.addEstoque(data);
          form.reset();
        });
      }},
      { selector: 'form#form-email', handler: async (form) => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          const data = Object.fromEntries(fd.entries());
          await window.fb.addEmail(data);
          form.reset();
        });
      }},
    ];

    for (const fm of formMap) {
      const f = document.querySelector(fm.selector);
      if (f) fm.handler(f);
    }
  } catch (err) {
    console.warn("Erro ao auto-attach forms:", err);
  }
});
