const procurarEmail = (contas, email) => {
    const emailProcurado = contas.find((variavel) => {
        const emailBD = variavel.usuario.email
        return email === emailBD
    });
    return emailProcurado;
};

module.exports = procurarEmail;

