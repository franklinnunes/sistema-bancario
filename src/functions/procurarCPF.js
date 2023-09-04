const procurarCPF = (contas, cpf) => {
    const cpfProcurado = contas.find((variavel) => {
        const cpfBD = variavel.usuario.cpf
        return cpf === cpfBD
    });
    return cpfProcurado;
};

module.exports = procurarCPF;