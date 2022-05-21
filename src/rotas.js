const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const postagens = require('./controladores/postagens');

const rotas = express();

rotas.post('/cadastro',usuarios.cadastrarUsuario);
rotas.post('/login',login.realizarLogin);

//Filtro para verificar usuário logado
rotas.use(verificaLogin);

rotas.get('/perfil',usuarios.obterPerfil);
rotas.put('/perfil',usuarios.atualizarPerfil);

rotas.post('/postagens',postagens.novaPostagem);
rotas.post('/postagens/:postagemId/curtir',postagens.curtirPostagem);
rotas.post('/postagens/:postagemId/comentar',postagens.comentarPostagem);

module.exports = rotas;