const knex = require('../conexao');

const novaPostagem = async (req, res) => {
    const {id} = req.usuario;
    const {texto, fotos} = req.body;

    if(!fotos || fotos.length === 0) {
        return res.status(404).json('É preciso enviar pelo menos uma foto');
    }

    try {
        const postagem = await knex('postagens').insert({texto, usuario_id :id}).returning('*').debug();

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

module.exports = {
    novaPostagem,
    curtirPostagem
}