const { contas, saques, depositos, transferencias } = require('../../bancodedados');
const validarConta = require('../../functions/validarConta');

const listarTransacoes = (req, res) => {
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
        const saquesConta = saques.filter((saque) => saque.numero_conta === numero_conta);
        const depositosConta = depositos.filter((deposito) => deposito.numero_conta === numero_conta);
        const transferenciasEnviadas = transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta);
        const transferenciasRecebidas = transferencias.filter((transferencia) => transferencia.numero_conta_destino === numero_conta);
        return res.status(200).json({
            depositos: depositosConta,
            saques: saquesConta,
            transferenciasEnviadas,
            transferenciasRecebidas
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { listarTransacoes };