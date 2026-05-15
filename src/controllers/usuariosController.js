import { getDatabase } from '../data/db.js';

export async function listar(req, res) {
    try {
        const db = await getDatabase();
        const usuarios = await db.all('SELECT id, nome, email, telefone FROM usuarios');
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
    }
}

export async function buscarPorId(req, res) {
    const { id } = req.params;
    try {
        const db = await getDatabase();
        const usuario = await db.get('SELECT id, nome, email, telefone FROM usuarios WHERE id = ?', [id]);
        
        if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuário.' });
    }
}

export async function criar(req, res) {
    const { nome, email, telefone, senha } = req.body;
    if (!nome || !email || !telefone || !senha) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios ausentes.' });
    }

    try {
        const db = await getDatabase();
        const resultado = await db.run(
            'INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)',
            [nome, email, telefone, senha]
        );
        res.status(201).json({ id: resultado.lastID, nome, email, telefone });
    } catch (erro) {
        if (erro.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' });
        }
        res.status(500).json({ mensagem: 'Erro ao salvar usuário.' });
    }
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    try {
        const db = await getDatabase();
        const usuarioAtual = await db.get('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (!usuarioAtual) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });

        const novoNome = nome ?? usuarioAtual.nome;
        const novoEmail = email ?? usuarioAtual.email;
        const novoTelefone = telefone ?? usuarioAtual.telefone;
        const novaSenha = senha ?? usuarioAtual.senha;

        await db.run(
            'UPDATE usuarios SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?',
            [novoNome, novoEmail, novoTelefone, novaSenha, id]
        );

        res.json({ id: Number(id), nome: novoNome, email: novoEmail, telefone: novoTelefone });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário.' });
    }
}

export async function remover(req, res) {
    const { id } = req.params;
    try {
        const db = await getDatabase();
        const resultado = await db.run('DELETE FROM usuarios WHERE id = ?', [id]);
        
        if (resultado.changes === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao remover usuário.' });
    }
}