const express = require('express');
const { listarContas } = require('./controladores/consultas/listarContasBancarias');
const { validarSenha } = require('./middlewares/checarSenha');
const { criarConta } = require('./controladores/gerenciamento/criarContaBancaria');
const { atualizarUsuario } = require('./controladores/gerenciamento/atualizarUsuario');
const { excluirConta } = require('./controladores/gerenciamento/excluirConta');
const { depositar } = require('./controladores/movimentacoes/depositar');
const { sacar } = require('./controladores/movimentacoes/sacar');
const { transferir } = require('./controladores/movimentacoes/transferir');
const { consultarSaldo } = require('./controladores/consultas/consultarSaldo');
const { listarTransacoes } = require('./controladores/consultas/extrato');

const router = express();

router.use(express.json());

router.get('/contas', validarSenha, listarContas);

router.post('/contas', criarConta);

router.put('/contas/:numeroConta/usuario', atualizarUsuario);

router.delete('/contas/:numeroConta', excluirConta);

router.post('/transacoes/depositar', depositar);

router.post('/transacoes/sacar', sacar);

router.post('/transacoes/transferir', transferir);

router.get('/contas/saldo', consultarSaldo);

router.get('/contas/extrato', listarTransacoes);

module.exports = router;