const validarConta = (contas, numeroConta) => {
    const conta = contas.find((conta) =>
        conta.numero === numeroConta
    );
    return conta;
};

module.exports = validarConta;