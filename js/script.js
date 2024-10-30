import {obedecePadrao, ehAMesmaSenha } from "./valida-senha.js";
import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const html = document.querySelector('html');
const titulo = document.querySelector('.app__title');
const funcionarioBt = document.querySelector('.app__card-button--funcionario');
const administradorBt = document.querySelector('.app__card-button--administrador');
const botoes = document.querySelectorAll('.app__card-button');
const iconeUser = document.querySelector('.app__image');
const camposPersonalizados = ['cpf','nascimento','senha','senhaR'];
const camposDoFormulario = document.querySelectorAll("[required]");

const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const listaRespostas = {
        "perfil": definirPerfil(),
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "senha": e.target.elements["senha"].value, //
        "cpf": e.target.elements["cpf"].value,
        "nascimento": e.target.elements["nascimento"].value
    };

    localStorage.setItem('cadastro',JSON.stringify(listaRespostas));
    window.location.href = "./sucesso.html";
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    nascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.'
    },
    senha: {
        valueMissing: 'O campo de Senha não pode estar vazio.',
    }, 
    senhaR: {
        valueMissing: 'O campo de Senha (Repetir) não pode estar vazio.',
    }, 
}

camposDoFormulario.forEach((campo) => {
    if(camposPersonalizados.includes(campo.name)) {
        campo.addEventListener("blur", () => verificaCampo(campo));
        campo.addEventListener("invalid", (evento) => evento.preventDefault());
    }
});

funcionarioBt.addEventListener('click', () => {
    alterarPerfil('funcionario');
    funcionarioBt.classList.add('active');
});

administradorBt.addEventListener('click', () => {
    alterarPerfil('administrador');
    administradorBt.classList.add('active');
});


function alterarPerfil(perfil) {
    html.setAttribute('data-perfil', perfil);
    iconeUser.setAttribute('src', `assets/images/${perfil}.png`);
    botoes.forEach(botao => {
        botao.classList.remove('active');
        botao.classList.remove('bg-purple-200');
    });

    switch (perfil) {
        case 'funcionario':
            titulo.textContent = 'Cadastro de usuários - Funcionário';
            funcionarioBt.classList.add('bg-purple-200');
            break;
        case 'administrador':
            titulo.textContent = 'Cadastro de usuários - Administrador';
            administradorBt.classList.add('bg-purple-200');
            break;
        default:
            break;
    }
}

function definirPerfil() {
    if (funcionarioBt.classList.contains('active')) {
        return 'funcionario';
    }
    return 'administrador';
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    if(campo.name == "senha") {
        obedecePadrao(campo);
    }
    if(campo.name == "senhaR") {
        const campoSenha = document.querySelector('#senha');
        const campoSenhaRepetida = document.querySelector('#senhaR');
        ehAMesmaSenha(campoSenha, campoSenhaRepetida);
    }
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCpf(campo);
    }
    if (campo.name == "nascimento" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
        if (campo.validity.customError) {
            mensagem = campo.validationMessage;
        }
    });

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}