const { contas } = require('../../bancodedados');
const procurarCPF = require('../../functions/procurarCPF');

const criarConta = (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ mensagem: 'O nome é obrigatório' });
        };
        if (!cpf) {
            return res.status(400).json({ mensagem: 'CPF é obrigatório e deve ser numérico.' });
        };
        if (!data_nascimento) {
            return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
        };
        if (!telefone) {
            return res.status(400).json({ mensagem: 'O telefone é obrigatório.' });
        };
        if (!email || !email.includes('@')) {
            return res.status(400).json({ mensagem: 'O campo email está faltando ou está em formato inválido.' });
        };
        if (!senha) {
            return res.status(400).json({ mensagem: 'A senha é obrigatória.' });
        };
        const cpfProcurado = procurarCPF(contas, cpf);
        if (cpfProcurado) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado.' });
        };
        const numero = (contas.length + 1).toString();
        const saldo = 0;
        const usuario = { nome, cpf, data_nascimento, telefone, email, senha };
        const conta = { numero, saldo, usuario };
        contas.push(conta);
        return res.status(201).json(conta);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { criarConta };