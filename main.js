var info = [];

//Impede caracteres alem de numeros de serem digitados
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

// Preenche o formulario
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value= endereco.logradouro;
    document.getElementById('bairro').value=endereco.bairro;
    document.getElementById('cidade').value=endereco.localidade;
    document.getElementById('estado').value=endereco.estado;
}



// Validador de CEP
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
// function cepTrim(cep) {
//     return cep.toString().replace(/\D/g, "");
//   }

// Consumo de API viaCEP
const pesquisarCEP = async() => {
    limpa_formulário_cep();
    // cepTrim(cep);
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const address = await dados.json();

        if(address.hasOwnProperty('erro')){
            alert('CEP não encontrado');
        } else {
            preencherFormulario(address);
        }
    } else {
        alert('CEP incorreto');
    }
}



document.getElementById('cep').addEventListener('focusout', pesquisarCEP);

function armazenaAjuda(name,tipoAjuda,desc,cepCad,rua,numeroRua,bairro,cidade,estado,email,telefone) {
    info.push({ name: name, tipoAjuda: tipoAjuda, desc: desc, cepCad: cepCad, rua: rua+', '+numeroRua, bairro:bairro, cidade: cidade, estado: estado, email: email, telefone:telefone});
    const infoString = JSON.stringify(info);
    localStorage.setItem('info', infoString);
    window.location.href = "./ajuda.html";
}

document.getElementById('cadastro-form').addEventListener('submit', function(event){
    event.preventDefault;
    let nameInput = document.getElementById('nome');
    let tipoAjudaInput = document.getElementById('tipoAjuda');
    let descInput = document.getElementById('desc');
    let cepInput = document.getElementById('cep');
    let ruaInput = document.getElementById('rua');
    let numeroRuaInput = document.getElementById('numero');
    let bairroInput = document.getElementById('bairro');
    let cidadeInput = document.getElementById('cidade');
    let estadoInput = document.getElementById('estado');
    let emailInput = document.getElementById('email');
    let telefoneInput = document.getElementById('telefone');
    let name = nameInput.value;
    let tipoAjuda = tipoAjudaInput.value;
    let desc = descInput.value;
    let cepCad = cepInput.value;
    let rua = ruaInput.value;
    let numeroRua = numeroRuaInput.value;
    let bairro = bairroInput.value;
    let cidade = cidadeInput.value;
    let estado = estadoInput.value;
    let email = emailInput.value;
    let telefone = telefoneInput.value;
    armazenaAjuda(name,tipoAjuda,desc,cepCad,rua,numeroRua,bairro,cidade,estado,email,telefone);
    // let nameInput = "";
    // let tipoAjudaInput = "";
    // let descInput = "";
    // let cepInput = "";
    // let ruaInput = "";
    // let numeroRuaInput = "";
    // let bairroInput = "";
    // let cidadeInput = "";
    // let estadoInput = "";
    // let emailInput = "";
    // let telefoneInput = "";*/
    
});