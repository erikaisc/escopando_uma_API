## Escopando uma API - Mini Instagram :camera:

O exercício deste repositório consiste em criar o escopo de uma API REST com base nas telas de Login, Cadastro, Feed e Criação de Post no Instagram.

>**Note**
>
> O código de aula está disponível na brach master. As alterações realizadas em aula foram incluídas na branch "codigo_atualizado".

### :white_check_mark: O que o usuário poderá fazer?

1. Login;
2. Cadastro;
3. Ver os dados de perfil e editar;
4. Ver postagens de outras pessoas;
5. Ver quantidade de curtidas;
6. Ver comentários de uma postagem;
7. Adicionar curtida;
8. Adicionar comentário.


### :x: O que o usuário não poderá fazer?

1. Ver localização;
2. Ver pessoas que curtiram uma postagem;
3. Curtir um comentário;
4. Comentar em outros comentários;

---

### :round_pushpin: Endpoints de Login e Cadastro

**1. POST - Login**
#### 1.1 Dados enviados
    - username e senha

#### 1.2 Dados retornados
    - sucesso ou erro

#### 1.3 Objetivos do endpoint

* Validar username e senha;
* Buscar o usuário no banco de dados;
* Verificar se a senha informada está correta;
* Gerar o token de autenticação;
* Retornar os dados de usuário e token de autenticação.

**2. POST - Cadastro**
#### 2.1 Dados enviados
    - username e senha

#### 2.2 Dados retornados
    - sucesso ou erro
    - token.

#### 2.3 Objetivos do endpoint

* Validar username e senha;
* Verificar se o username já existe;
* Criptografar a senha;
* Cadastrar o usuário no banco de dados;
* Retornar sucesso ou erro.

---

### :round_pushpin: Endpoints de Perfil

**1. GET - Perfil**
#### 1.1 Dados enviados
    - token (contém username ou id do usuário)

#### 1.2 Dados retornados
    - URL da foto, Nome, username, site e bio
    - e-mail, telefone e gênero

#### 1.3 Objetivos do endpoint

* Validar o token do usuário
* Buscar o usuário/cadastro com informação do token
* Retornar os dados do usuário

**2. PUT - Atualizar cadastro**
#### 2.1 Dados enviados

    -URL da foto, Nome, username, site e bio
    -e-mail, telefone e gênero
    -senha
#### 2.2 Dados retornados
      -sucesso ou erro

#### 2.3 Objetivos do endpoint

* Validar o token do usuário;
* Buscar o usuário/cadastro com informação do token;
* Atualizar os dados do usuário (exigir pelo menos um campo para atualizar);
* Criptografar nova senha, se houver alteração;
* Verificar nome e username (se já existe no banco de dados), se houver alteração;
* Atualizar registro do usuário no banco de dados;
* Retornar sucesso ou erro.

---

### :round_pushpin: Endpoints de Postagem

**1. GET - Postagens**
#### 1.1 Dados enviados

    -token (que terá id ou username)
    -offset (paginação)
#### 1.2 Dados retornados
    - postagens
    - informar se foi curtida por mim ou não
    - id
    - Usuário
        - URL da foto
        - username
        - perfil oficial (boolean)
    - Fotos
    - Curtidas (quantidade)
    - Comentários
        - username
        - texto
     -Data

#### 1.3 Objetivos do endpoint

* Validar o token do usuário;
* Buscar o usuário/cadastro com informação do token;
* Retornar postagens de outras pessoas.

**2. POST - Postagens**
#### 2.1 Dados enviados

    - token (que terá id ou username)
    - texto da postagem
    - array com fotos

#### 2.2 Dados retornados

    -sucesso ou erro

#### 2.3 Objetivos do endpoint

* Validar o token do usuário;
* Buscar o usuário/cadastro com informação do token;
* Exigir que seja informado pelo menos uma foto no array;
* Cadastrar a postagem para o usuário logado;
* Cadastro das fotos da postagem;
* Retornar sucesso ou erro.

---

### :round_pushpin: Endpoint de Curtida

**1. POST - Curtir**
#### 1.1 Dados enviados

    -token (contém username ou id do usuário)
    -id da postagem

#### 1.1 Dados retornados

    -sucesso ou erro

#### 1.3 Objetivos do endpoint

* Validar o token do usuário;
* Buscar o usuário/cadastro com informação do token;
* Buscar a postagem com informação do id;
* Verificar se o usuário já curtiu a postagem;
* Cadastrar a curtida da postagem no banco de dados;
* Retornar sucesso ou erro.

---

### :round_pushpin: Endpoint de Comentário

**1. POST - Comentário**
#### 1.1 Dados enviados

    -token (contém username ou id do usuário)
    -id da postagem
    -texto do comentário

#### 1.2 Dados retornados
    -sucesso ou erro

#### Objetivos gerais

* Validar o token do usuário;
* Buscar o usuário/cadastro com informação do token;
* Validar se há texto no comentário;
* Buscar a postagem com informação do id;
* Cadastrar o comentário na postagem;
* Retornar sucesso ou erro.


