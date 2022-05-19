# escopando_uma_API
## Escopando uma API - Mini Instagram

### O que o usuário pode fazer

1. Login
2. Cadastro
3. ver os dados de perfil e editar
4. ver postagens de outras pessoas.
5. ver quantidade de curtidas
6. ver comentários de uma postagem
7. adicionar curtida (++)
8. adicionar comentário

### O que não será feito

1. ver localização
2. ver pessoas que curtiram uma postagem
3. curtir um comentário
4. comentar em outros comentários

### Endpoints de Login e Cadastro

1. POST - Login
   1.1 Dados enviados

-     username e senha

  1.2 Dados retornados

-     sucesso e/ou erro

#### 1.3 Objetivos gerais

1. Validar username e senha
2. Buscar o usuário no banco de dados
3. Verificar se a senha informada está correta
4. Gerar o token de autenticação
5. Retornar os dados de usuário e token de autenticação

6. POST - Cadastro
   2.1 Dados enviados

-     username e senha

  2.2 Dados retornados

-     sucesso e/ou erro + token

#### Objetivos gerais

1. Validar username e senha
2. Verificar se o username já existe
3. Criptografar a senha
4. Cadastrar o usuário no banco de dados
5. Retornar sucesso ou erro

---

### Endpoints de Perfil

1. GET - Perfil
   1.1 Dados enviados

-     token (que terá id ou username)

  1.2 Dados retornados

-     URL da foto, Nome, username, site e bio
-     e-mail, telefone e gênero (privado)

#### Objetivos gerais

1. Validar o token do usuário
2. Buscar o usuário/cadastro com informação do token
3. Retornar os dados do usuário

4. POST/PUT - Atualizar perfil
   2.1 Dados enviados

-     URL da foto, Nome, username, site e bio
-     e-mail, telefone e gênero (privado)
-     senha
  2.2 Dados retornados
-     sucesso e/ou erro

#### Objetivos gerais

1. Validar o token do usuário
2. Buscar o usuário/cadastro com informação do token
3. Atualizar os dados do usuário (exigir pelo menos um campo para atualizar)
4. Criptografar nova senha, se houver alteração
5. Verificar nome e username (se já existe no banco de dados), se houver alteração
6. Atualizar registro do usuário no banco de dados
7. Retornar sucesso ou erro

---

---

### Endpoint de Postagem

1. GET - Postagens
   1.1 Dados enviados

-     token (que terá id ou username)
-     offset (paginação)
  1.2 Dados retornados
-     postagens []
-     foi curtida por mim ou não
  -     id
  -     Usuário
    -     URL da foto
    -     username
    -     perfil oficial
  -     Fotos[]
  -     Curtidas (quantidade)
  -     Comentários[]
    -     username
    -     texto
  -     Data

---

### Endpoint de Curtida

1. POST - Curtir
   1.1 Dados enviados

-     token (contém username ou id do usuário)
-     id da postagem

  1.2 Dados retornados

-     sucesso e/ou erro

---

### Endpoint de Comentário

1. POST - Comentar
   1.1 Dados enviados

-     token (contém username ou id do usuário)
-     id da postagem
-     texto do comentário

  1.2 Dados retornados

-     sucesso e/ou erro
