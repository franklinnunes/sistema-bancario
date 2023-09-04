const { contas, saques } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');
const { format } = require('date-fns');

const sacar = (req, res) => {
    try {
        const { numero_conta, valor, senha } = req.body;
        const momento = new Date();
        const data = format(momento, 'yyyy-MM-dd HH:mm:ss');
        const conta = validarConta(contas, numero_conta);
        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        };
        if (senha !== conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'A senha está incorreta.' });
        };
        if (valor > conta.saldo) {
            return res.status(400).json({ mensagem: 'Não é permitido saque com valor superior ao saldo em conta.' });
        };
        conta.saldo -= valor;
        saques.push({ data, numero_conta, valor });
        return res.status(201).json({ mensagem: 'Saque realizado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { sacar };