const { contas } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');

const consultarSaldo = (req, res) => {
    try {
        const { numero_conta, senha } = req.query;
        if (!numero_conta || !senha) {
            return res.status(400).json({ mensagem: 'Os parâmetros de query numero_conta e senha são obrigatórios.' });
        };
        const conta = validarConta(contas, numero_conta);
        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        };
        if (senha !== conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'A senha está incorreta.' });
        };
        return res.status(200).json({ saldo: conta.saldo });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { consultarSaldo };