const knex = require('../conexao');

const novaPostagem = async (req, res) => {
    const {id} = req.usuario;
    const {texto, fotos} = req.body;

    if(!fotos || fotos.length === 0) {
        return res.status(404).json('É preciso enviar pelo menos uma foto');
    }

    try {
        const postagem = await knex('postagens').insert({texto, usuario_id :id}).returning('*');

        if(!postagem){
            return res.status(400).json('Não foi possível criar a postagem');
        }
        
        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id;
        }

        const fotosPostagem = await knex('postagem_fotos').insert(fotos).debug();

        if(!fotosPostagem){
            await knex('postagens').where({id: postagem[0].id}).del();
            return res.status(400).json('Não foi possível criar a postagem');
        }

        return res.status(200).json('Postagem criada com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const curtirPostagem = async (req, res) => {
    const {id} = req.usuario;
    const {postagemId} = req.params;

    try {
        const postagem = await knex('postagens').where({id: postagemId}).first();

        if(!postagem){
            return res.status(404).json('Postagem não encontrada');
        }

        const jaCurtiu = await knex('postagem_curtidas').where({usuario_id: id, postagem_id: postagemId}).first();

        if(jaCurtiu){
            return res.status(400).json('Essa postagem já foi curtida por esse usuário.');
        }

        const curtida = await knex('postagem_curtidas').insert({usuario_id: id, postagem_id: postagemId}).debug();

        if(!curtida){
            return res.status(400).json('Não foi possível curtir a postagem.');
        }

        return res.status(200).json('Postagem curtida <3.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const comentarPostagem = async (req, res) => {
    const {id} = req.usuario;
    const {postagemId} = req.params;
    const {texto} = req.body;

    if(!texto){
        return res.status(404).json('Para adicionar um comentário, é preciso escrever algo.');
    }

    try {
        const postagem = await knex('postagens').where({id: postagemId}).first();

        if(!postagem){
            return res.status(404).json('Postagem não encontrada');
        }
        
        const comentario = await knex('postagem_comentarios').insert({usuario_id: id, postagem_id: postagemId,texto});

        if(!comentario){
            return res.status(400).json('Não foi possível comentar na postagem.');
        }

        return res.status(200).json('Comentário enviado.');
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const meuFeed = async (req, res) => {
    const {id} = req.usuario;
    let {offset} = req.query;

    const verificaOffset = offset ? offset : 0;
    
    try {
        // const postagens = knex('postagens').limit(10).offset(verificaOffset);
        const postagens = await knex('postagens').where('usuario_id','!=',id).limit(10).offset(verificaOffset);
        
        if(postagens.length == 0 ){
            return res.status(200).json(postagens)
        }

        for (const postagem of postagens) {
            //usuario
            const usuario = await knex('usuarios').where({id:postagem.usuario_id})
            .select('imagem','username','verificado').first();

            postagem.usuario = usuario;

            //fotos
            const fotos = await knex('postagem_fotos')
            .where({postagem_id: postagem.id})
            .select('imagem');

            postagem.fotos = fotos;

            //curtidas
            const curtidas = await knex('postagem_curtidas')
            .where({postagem_id: postagem.id}).select('usuario_id');

            postagem.curtidas = curtidas.length;

            //curtido por mim
            postagem.cutidoPorMim = curtidas.find(curtida => curtida.usuario_id == id) ? true : false;

            //comentário
            const comentarios = await knex('postagem_comentarios')
            .leftJoin('usuarios','usuarios.id','postagem_comentarios.usuario_id')
            .where({postagem_id : postagem.id})
            .select('usuarios.username','postagem_comentarios.texto');

            postagem.comentarios = comentarios;
        }

        return res.status(200).json(postagens);
    } catch (error) {
        return res.status(400).json(error.message);          
    }
    
}

module.exports = {
    novaPostagem,
    curtirPostagem,
    comentarPostagem,
    meuFeed
}