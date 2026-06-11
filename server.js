const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecoguard'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
        console.error('Sensacional! Conectado com sucesso ao banco MySQL no XAMPP!');
    }
});

    app.post('/cadastrar', (req, res) => {
        const {nome, idade, email, cpf, endereco } = req.body;

        const comandoSQL = 'INSERT INTO usuarios (nome, idade, email, cpf, endereco) VALUES (?,?,?,?,?)';

        conexao.query(comandoSQL, [nome, idade, email, cpf, endereco], (erro, resultado) => {
            if (erro) {
                console.log('Erro ao inserir no banco:', erro);
                return res.status(500).json({ mensagem: 'Erro ao salvar o usuário no banco de dados.'});
            } else {
                return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso no MySQL!'});
            }
        })
    })

app.listen(3000, () => {
    console.log('Servidor back-end rodando na porta 3000! Pronto para receber pedidos.');
});


