  CREATE DATABASE mini_insta;
  
  CREATE TABLE usuarios (
  	id serial primary key,
  	nome text,
    imagem text,
    username text NOT NULL UNIQUE,
    email text UNIQUE,
    site text,
    bio text,
    telefone text, 
    genero text,
    senha text NOT NULL,
    verificado boolean default false
  );
  
CREATE TABLE postagens(
  	id serial primary key,
    usuario_id int NOT NULL,
    data timestamptz default now(),
    texto text,
    foreign key (usuario_id) references usuarios (id)
  );
  
  CREATE TABLE postagem_fotos (
  	id serial primary key,
    postagem_id int NOT NULL,
    imagem text NOT NULL,
     foreign key (postagem_id) references postagens (id)
  );
  
  CREATE TABLE postagem_comentarios(
  	id serial primary key,
    texto text NOT NULL,
    data timestamptz default now(),
    usuario(id) int NOT NULL,
  	postagem_id int NOT NULL  
  	foreign key (postagem_id) references postagens (id),
    foreign key (usuario_id) references usuarios (id)
  );

  CREATE TABLE postagem_curtidas(
    usuario_id int NOT NULL,
    postagem_id int NOT NULL,
    data timestamptz default now(),
    foreign key (postagem_id) references postagens (id),
    foreign key (usuario_id) references usuarios (id)
  );
