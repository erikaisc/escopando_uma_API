const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.post('/cadastro',usuarios.cadastrarUsuario);
rotas.post('/login',login.realizarLogin);

//Filtro para verificar usuário logado
rotas.use(verificaLogin);

rotas.get('/perfil',usuarios.obterPerfil);
rotas.put('/perfil',usuarios.atualizarPerfil);

module.exports = rotas;