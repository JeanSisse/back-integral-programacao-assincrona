const axios = require('axios');
const fsPromises = require('fs/promises');

function formatarCep(cep){
    let copiaCep = cep.split("");
    copiaCep.splice(5, 0, "-");
    copiaCep = copiaCep.join("");

    return copiaCep;
}

async function salvarEndereco(endereco, arrayEnderecos){
    arrayEnderecos.push(endereco);
    await fsPromises.writeFile('enderecos.json', JSON.stringify(arrayEnderecos));
    return endereco;
}

const buscarCep = async (req, res) => {

    const cep = req.params.cep;
    let endereco;
    
    const arrayEnderecos = JSON.parse(await fsPromises.readFile("enderecos.json"));

    const url = 'https://viacep.com.br/ws/'+cep+'/json/';
    if(arrayEnderecos.length === 0){
        const response = await axios.get(`${url}`);
        if(!response.data.erro){
            endereco = await salvarEndereco(response.data, arrayEnderecos);
        } else {
            endereco = "erro: cep não foi encontrado.";
        }
    } else {

        let copiaCep = formatarCep(cep);
        endereco = arrayEnderecos.find(address => address.cep === copiaCep);
        if(!endereco){
            const response = await axios.get(`${url}`);
            if(!response.data.erro){
                endereco = await salvarEndereco(response.data, arrayEnderecos);
            } else {
                endereco = "erro: cep não foi encontrado.";
            }
        }
    }

    res.json(endereco);
}

module.exports = {buscarCep};