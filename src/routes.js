const express = require('express');
const { listarContas } = require('./controllers/consultas/listarContasBancarias');
const { validarSenha } = require('./middlewares/checarSenha');
const { criarConta } = require('./controllers/gerenciamento/criarContaBancaria');
const { atualizarUsuario } = require('./controllers/gerenciamento/atualizarUsuario');
const { excluirConta } = require('./controllers/gerenciamento/excluirConta');
const { depositar } = require('./controllers/movimentacoes/depositar');
const { sacar } = require('./controllers/movimentacoes/sacar');
const { transferir } = require('./controllers/movimentacoes/transferir');
const { consultarSaldo } = require('./controllers/consultas/consultarSaldo');
const { listarTransacoes } = require('./controllers/consultas/extrato');

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