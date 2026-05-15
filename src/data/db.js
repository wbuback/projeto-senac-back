import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbConnection = null;

export async function getDatabase() {
    if (!dbConnection) {
        dbConnection = await open({
            filename: './src/data/database.db',
            driver: sqlite3.Database
        });

        // Ativa restrições de Chave Estrangeira em nível de conexão
        await dbConnection.run('PRAGMA foreign_keys = ON;');

        // Criação de tabelas caso não existam
        await dbConnection.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                telefone TEXT,
                senha TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                concluida INTEGER NOT NULL DEFAULT 0,
                usuarioId INTEGER NOT NULL,
                FOREIGN KEY (usuarioId) REFERENCES usuarios (id) ON DELETE CASCADE
            );
        `);
    }
    return dbConnection;
}