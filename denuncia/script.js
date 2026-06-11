const nomeRio = document.getElementById('nome-rio');
const municipioRio = document.getElementById('municipio-rio');
const localizacaoCasual = document.getElementById('localizacao-casual');
const tipoPoluicao = document.getElementById('tipo-poluicao');
const fotosEvidencia = document.getElementById('fotos-evidencia');
const descricaoCrime = document.getElementById('descricao-crime');

const botaoEnviar = document.getElementById('btn-enviar-denuncia');

const denuncias = [];

botaoEnviar.addEventListener('click', (evento) => {
    
    evento.preventDefault(); 

    const rio = nomeRio.value;
    const municipio = municipioRio.value;
    const localizacao = localizacaoCasual.value;
    const poluicao = tipoPoluicao.value;
    const fotos = fotosEvidencia.files; 
    const descricao = descricaoCrime.value;

    if (municipio === '' || localizacao === '' || poluicao === '' || fotos.length === 0) {
        alert('Por favor, preencha todos os campos obrigatórios (*)!');
    } else {
        
        const novaDenuncia = {
            rio: rio,
            municipio: municipio,
            localizacao: localizacao,
            tipoPoluicao: poluicao,
            totalFotos: fotos.length, 
            descricao: descricao
        };

        denuncias.push(novaDenuncia);
        console.table(denuncias);

        alert('Denúncia protocolada com sucesso no sistema (simulação)!');
    }
});
