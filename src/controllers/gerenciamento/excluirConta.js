const { contas } = require('../../bancodedados.js');

const excluirConta = (req, res) => {
    try {
        const { numeroConta } = req.params;
        const indiceConta = contas.findIndex((conta) =>
            conta.numero === numeroConta
        );
        if (indiceConta === -1) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        };
        const conta = contas[indiceConta];
        if (conta.saldo !== 0) {
            return res.status(400).json({ mensagem: 'Não é permitido excluir conta bancária que possua saldo em conta.' });
        } else {
            contas.splice(indiceConta, 1)
            return res.status(200).json({ mensagem: 'Conta excluída com sucesso.' });
        };
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { excluirConta };


