const { contas, transferencias } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');
const { format } = require('date-fns');

const transferir = (req, res) => {
    try {
        const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
        const contaOrigem = validarConta(contas, numero_conta_origem);
        const contaDestino = validarConta(contas, numero_conta_destino);
        const transferencia = Number(valor);
        const momento = new Date();
        const data = format(momento, 'yyyy-MM-dd HH:mm:ss');
        if (!contaOrigem || !contaDestino) {
            return res.status(404).json({ mensagem: 'Uma das contas não foi encontrada.' });
        };
        if (senha !== contaOrigem.usuario.senha) {
            return res.status(400).json({ mensagem: 'A senha está incorreta.' });
        };
        if (transferencia > contaOrigem.saldo) {
            return res.status(400).json({ mensagem: 'Saldo inválido.' });
        };
        contaOrigem.saldo -= transferencia;
        contaDestino.saldo += transferencia;
        transferencias.push({ data, numero_conta_origem, numero_conta_destino, valor });
        return res.status(201).json({ mensagem: 'Transferência realizada com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { transferir };