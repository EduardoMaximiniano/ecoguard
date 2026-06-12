const nomeRio = document.getElementById('nome-rio');
const municipioRio = document.getElementById('municipio-rio');
const localizacaoCasual = document.getElementById('localizacao-casual');
const tipoPoluicao = document.getElementById('tipo-poluicao');
const descricaoCrime = document.getElementById('descricao-crime');

const botaoEnviar = document.getElementById('btn-enviar-denuncia');
const botaoVoltar = document.getElementById("btn-cancelar");

botaoVoltar.addEventListener('click', () => {
    window.location.href = '../inicio.html';
});

botaoEnviar.addEventListener('click', (evento) => {
    evento.preventDefault(); 

    const rio = nomeRio.value;
    const municipio = municipioRio.value;
    const localizacao = localizacaoCasual.value;
    const poluicao = tipoPoluicao.value;
    const descricao = descricaoCrime.value;

    // Removida a trava obrigatória de fotos para o JSON não quebrar
    if (municipio === '' || localizacao === '' || poluicao === '') {
        alert('Por favor, preencha todos os campos obrigatórios (*)!');
        return; // Para a execução aqui se faltar dados
    }

    const novaDenuncia = {
        rio: rio,
        municipio: municipio,
        localizacao: localizacao,
        tipoPoluicao: poluicao,
        descricao: descricao
    };

   fetch('https://ecoguard-2rnw.onrender.com/api/denuncias', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaDenuncia) // Aqui você usa o objeto da denúncia
})
    .then(resposta => {
        if (resposta.ok) {
            alert('Denúncia enviada com sucesso para a nuvem!');
            // Limpa os campos após o envio
            nomeRio.value = '';
            municipioRio.value = '';
            localizacaoCasual.value = '';
            tipoPoluicao.value = '';
            descricaoCrime.value = '';
        } else {
            alert('Erro ao enviar a denúncia ao servidor.');
        }
    })
    .catch(erro => {
        console.error('Erro na conexão:', erro);
        alert('Não foi possível conectar ao servidor.');
    });
});