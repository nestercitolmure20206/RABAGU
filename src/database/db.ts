import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

const db: SQLiteDatabase = SQLite.openDatabaseSync('miapp.db');

export const initDB = () => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL
    );`
  );
  db.execSync(
    `CREATE TABLE IF NOT EXISTS tareas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      usuario_id INTEGER,
      fecha TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );`
  );
};

export { db };