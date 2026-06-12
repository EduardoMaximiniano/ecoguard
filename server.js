const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão direta com a sua Render
const conexao = new Pool({
    connectionString: 'postgresql://eduardo:3uX7x1FfFUXF7nBD3mV4B3IkJERVDSBw@dpg-d8lo5ja8qa3s73alvmkg-a.oregon-postgres.render.com/ecoguard_db',
    ssl: { rejectUnauthorized: false }
});

// Força a criação das duas tabelas na inicialização de forma separada
conexao.connect()
    .then(() => {
        console.log('Conectado ao banco na Render!');
        
        // Cria tabela de denúncias
        conexao.query(`CREATE TABLE IF NOT EXISTS denuncias (
            id SERIAL PRIMARY KEY,
            nome_rio VARCHAR(255),
            municipio VARCHAR(255) NOT NULL,
            localizacao VARCHAR(255) NOT NULL,
            tipo_poluicao VARCHAR(255) NOT NULL,
            descricao TEXT,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`).then(() => console.log('Tabela denuncias pronta!'))
           .catch(err => console.error('Erro na tabela denuncias:', err));

        // Cria tabela de usuários
        conexao.query(`CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            idade INT,
            email VARCHAR(255) NOT NULL,
            cpf VARCHAR(20),
            endereco VARCHAR(255),
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`).then(() => console.log('Tabela usuarios pronta!'))
           .catch(err => console.error('Erro na tabela usuarios:', err));
    })
    .catch(erro => console.error('Erro ao conectar na nuvem:', erro));

// Rota de Cadastro de Usuários
app.post('/cadastrar', (req, res) => {
    const { nome, idade, email, cpf, endereco } = req.body;
    const comandoSQL = 'INSERT INTO usuarios (nome, idade, email, cpf, endereco) VALUES ($1, $2, $3, $4, $5)';

    conexao.query(comandoSQL, [nome, idade, email, cpf, endereco], (erro, resultado) => {
        if (erro) {
            console.log('Erro ao inserir usuario:', erro);
            return res.status(500).json({ mensagem: 'Erro ao salvar o usuário.' });
        }
        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
});

// Rota de Envio de Denúncias
app.post('/api/denuncias', (req, res) => {
    const { rio, municipio, localizacao, tipoPoluicao, descricao } = req.body;
    const comandoSQL = 'INSERT INTO denuncias (nome_rio, municipio, localizacao, tipo_poluicao, descricao) VALUES ($1, $2, $3, $4, $5)';

    conexao.query(comandoSQL, [rio, municipio, localizacao, tipoPoluicao, descricao], (erro, resultado) => {
        if (erro) {
            console.log('Erro ao inserir denuncia:', erro);
            return res.status(500).json({ mensagem: 'Erro ao salvar a denúncia.' });
        }
        return res.status(201).json({ mensagem: 'Denúncia cadastrada com sucesso!' });
    });
});

    // Rota rápida para você ver suas denúncias direto no navegador
app.get('/ver-denuncias', (req, res) => {
    conexao.query('SELECT * FROM denuncias', (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        return res.json(resultado.rows); // Mostra as linhas salvas
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});