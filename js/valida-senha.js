export function obedecePadrao(campo) {
    const senha = campo.value;

    if (naoTemQtdMinimaCarecteres(senha)) {
        campo.setCustomValidity('A senha não tem a quantidade mínima de caracteres!');
    }
    if (naoTemNumero(senha)) {
        campo.setCustomValidity('A senha deve possuir no mínimo 1 número!');
    }
}

export function ehAMesmaSenha(campoSenha, campoSenhaRepetida) {
    if(campoSenha.value !== campoSenhaRepetida.value){
        campoSenhaRepetida.setCustomValidity('As senhas não conferem!');
    }
}

function naoTemQtdMinimaCarecteres(senha){
    return senha.length < 6;
}

function naoTemNumero(senha){
    return !/\d/.test(senha);
}