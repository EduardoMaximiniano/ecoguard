const nomeUsuario = document.getElementById('campo-nome');
const idadeUsuario = document.getElementById('campo-idade');
const emailUsuario = document.getElementById('campo-email');
const cpfUsuario = document.getElementById('campo-cpf');
const enderecoUsuario = document.getElementById('campo-endereco');

const botao = document.getElementById('btn-cadastrar');

const listaUsuarios = document.getElementById('lista-usuarios');

const usuarios = [];

botao.addEventListener('click', (evento) => {

    const nomee = nomeUsuario.value;
    const idadee= idadeUsuario.value;
    const emaill = emailUsuario.value;
    const cpff = cpfUsuario.value;
    const enderecoo = enderecoUsuario.value;

    if (nomee === '' || emaill === '' || cpff === '' || enderecoo === '') {
        alert('Digite em Todos os campos!');
    } else if (idadee < 16) {
        alert('Cadastro negado! Aplicativo somente para maiores de 16 anos.');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    } else if (idadee >= 16){
        const novoUsuario = {
            nome: nomee,
            idade: idadee,
            email: emaill,
            cpf: cpff,
            endereco: enderecoo
        }

        fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        })
        .then(resposta => {
            if (resposta.status === 201) {
                botao.style.backgroundColor = 'green';
                botao.innerHTML = 'Redirecionando...';

                setTimeout(() => {
                    window.location.href = 'inicio.html';
                }, 2000);
            } else {
                alert('Erro ao salvar no banco de dados.');
            }
        })

        .catch(erro => {
            console.error('erro na rede:', erro);
            alert('Não foi possível conectar ao servidor back-end.')
        })

    }
})