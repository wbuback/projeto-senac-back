import { getDatabase } from '../data/db.js';

export async function listar(req, res) {
    try {
        const db = await getDatabase();
        const tarefas = await db.all('SELECT * FROM tarefas');
        // Mapeia inteiro do SQLite (0/1) de volta para o booleano do JS
        const resposta = tarefas.map(t => ({ ...t, concluida: t.concluida === 1 }));
        res.json(resposta);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar tarefas.' });
    }
}

export async function criar(req, res) {
    const { titulo, usuarioId } = req.body;
    if (!titulo || !usuarioId) return res.status(400).json({ mensagem: 'Campos obrigatórios ausentes.' });

    try {
        const db = await getDatabase();
        const resultado = await db.run(
            'INSERT INTO tarefas (titulo, usuarioId, concluida) VALUES (?, ?, 0)',
            [titulo, usuarioId]
        );
        res.status(201).json({ id: resultado.lastID, titulo, concluida: false, usuarioId });
    } catch (erro) {
        if (erro.message.includes('FOREIGN KEY constraint failed')) {
            return res.status(400).json({ mensagem: 'O usuarioId informado não existe.' });
        }
        res.status(500).json({ mensagem: 'Erro ao criar tarefa.' });
    }
}