// db.js — "banco" em memória
// arrays simulam tabelas; contadores guardam o próximo id de cada recurso.
// usar contador (e não array.length) evita reuso de id após exclusões.

export const usuarios = [
  {
    id: 1,
    nome: 'Buba',
    email: 'buba@example.com',
    telefone: '27999999999',
    senha: '123456' // sem hash propositalmente — apenas para fins didáticos
  },
  {
    id: 2,
    nome: 'Maria Silva',
    email: 'maria.silva@example.com',
    telefone: '11988888888',
    senha: 'senha123'
  },
  {
    id: 3,
    nome: 'João Santos',
    email: 'joao.santos@example.com',
    telefone: '21987654321',
    senha: 'senha456'
  },
  {
    id: 4,
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@example.com',
    telefone: '31986543210',
    senha: 'senha789'
  },
  {
    id: 5,
    nome: 'Carlos Costa',
    email: 'carlos.costa@example.com',
    telefone: '85999999999',
    senha: 'senha101'
  }
];

export const tarefas = [
  { id: 1, titulo: 'Estudar Node', concluida: false, usuarioId: 1 },
  { id: 2, titulo: 'Criar API REST', concluida: true, usuarioId: 1 },
  { id: 3, titulo: 'Estudar React', concluida: false, usuarioId: 1 },
  { id: 4, titulo: 'Fazer compras', concluida: true, usuarioId: 2 },
  { id: 5, titulo: 'Pagar conta de luz', concluida: false, usuarioId: 2 },
  { id: 6, titulo: 'Limpar casa', concluida: false, usuarioId: 2 },
  { id: 7, titulo: 'Revisar código', concluida: true, usuarioId: 3 },
  { id: 8, titulo: 'Debugar aplicação', concluida: false, usuarioId: 3 },
  { id: 9, titulo: 'Escrever documentação', concluida: false, usuarioId: 4 },
  { id: 10, titulo: 'Testes automatizados', concluida: true, usuarioId: 4 },
  { id: 11, titulo: 'Deploy para produção', concluida: false, usuarioId: 4 },
  { id: 12, titulo: 'Reunião com cliente', concluida: true, usuarioId: 5 },
  { id: 13, titulo: 'Planejamento sprint', concluida: false, usuarioId: 5 }
];

// objeto centralizando os próximos ids de cada coleção
export const contadores = {
  usuarios: 6,
  tarefas: 14
};
