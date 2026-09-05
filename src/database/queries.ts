import { db } from './db';

export const insertarUsuario = (nombre: string, email: string, rol: string) => {
  db.runSync(
    'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?);',
    [nombre, email, rol]
  );
};

export const obtenerUsuarios = () => {
  return db.getAllSync('SELECT * FROM usuarios;');
};

export const insertarProducto = (titulo: string, descripcion: string, precio: number, vendedora_id: number) => {
  db.runSync(
    'INSERT INTO productos (titulo, descripcion, precio, vendedora_id) VALUES (?, ?, ?, ?);',
    [titulo, descripcion, precio, vendedora_id]
  );
};

export const obtenerProductos = () => {
  return db.getAllSync('SELECT * FROM productos;');
};