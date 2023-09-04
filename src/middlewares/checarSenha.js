const dadosBanco = require('../bancodedados');

const validarSenha = (req, res, next) => {
    const senha_banco = req.query.senha_banco
    if (!senha_banco) {
        return res.status(400).json({ mensagem: "A senha não foi informada." });
    };
    if (senha_banco !== dadosBanco.banco.senha) {
        return res.status(400).json({ mensagem: "A senha está incorreta." });
    };
    next();
};

module.exports = { validarSenha };