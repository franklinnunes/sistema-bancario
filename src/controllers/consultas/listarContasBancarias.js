const { contas } = require('../../bancodedados');

const listarContas = (req, res) => {
    try {
        if (Object.keys(contas).length === 0) {
            return res.status(400).json({ mensagem: 'Não há contas para listar.' });
        };
        return res.status(200).json(contas);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    };
};

module.exports = { listarContas };