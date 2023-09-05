const { contas, depositos } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');
const { format } = require('date-fns');

const depositar = (req, res) => {
    try {
        const { numero_conta, valor } = req.body;
        const momento = new Date();
        const data = format(momento, 'yyyy-MM-dd HH:mm:ss');
        const deposito = Number(valor);
        if (valor <= 0) {
            res.status(400).json({ mensagem: 'Não são permitidos valores negativos ou zerados.' });
        };
        const conta = validarConta(contas, numero_conta);
        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        };
        conta.saldo += deposito;
        depositos.push({ data, numero_conta, valor });
        return res.status(201).json({ mensagem: 'Depósito realizado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { depositar };