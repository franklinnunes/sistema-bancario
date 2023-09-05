const { contas } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');
const procurarCPF = require('../../functions/procurarCPF');
const procurarEmail = require('../../functions/procurarEmail');

const atualizarUsuario = (req, res) => {
    try {
        const { numeroConta } = req.params;
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        const conta = validarConta(contas, numeroConta);
        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        };
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensagem: 'Pelo menos uma propriedade deve ser passada no body da requisição.' });
        };
        const cpfProcurado = procurarCPF(contas, cpf);
        if (cpfProcurado) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado.' });
        };
        const emailProcurado = procurarEmail(contas, email);
        if (emailProcurado) {
            return res.status(400).json({ mensagem: 'Email já cadastrado.' });
        };
        conta.usuario = {
            nome: nome ?? conta.usuario.nome,
            cpf: cpf ?? conta.usuario.cpf,
            data_nascimento: data_nascimento ?? conta.usuario.data_nascimento,
            telefone: telefone ?? conta.usuario.telefone,
            email: email ?? conta.usuario.email,
            senha: senha ?? conta.usuario.senha
        };
        return res.status(201).json({ mensagem: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { atualizarUsuario };