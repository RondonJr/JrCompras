CREATE TABLE IF NOT EXISTS categoria(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria_name TEXT
);

INSERT or IGNORE INTO categoria(id, categoria_name) VALUES (1, 'Supermercado');

CREATE TABLE IF NOT EXISTS unidade(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unidade_name TEXT
);

INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (1, 'Kg');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (2, 'g');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (3, 'Un');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (4, 'Sc');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (5, 'L');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (6, 'ml');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (7, 'Dz');
INSERT or IGNORE INTO unidade(id, unidade_name) VALUES (8, 'Pct');


CREATE TABLE IF NOT EXISTS produto(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_name TEXT,
    unidadeId INTEGER,
    categoriaId INTEGER,
    quantidade INTEGER
);

INSERT or IGNORE INTO produto(id, produto_name, unidadeId, categoriaId, quantidade) VALUES (1, 'Arroz', 1, 1, 2);
INSERT or IGNORE INTO produto(id, produto_name, unidadeId, categoriaId, quantidade) VALUES (2, 'Feijão', 1, 1, 1);
INSERT or IGNORE INTO produto(id, produto_name, unidadeId, categoriaId, quantidade) VALUES (3, 'Brócolis', 2, 2, 4);
INSERT or IGNORE INTO produto(id, produto_name, unidadeId, categoriaId, quantidade) VALUES (4, 'Cenoura', 1, 2, 1);
INSERT or IGNORE INTO produto(id, produto_name, unidadeId, categoriaId, quantidade) VALUES (5, 'Cerveja', 2, 1, 24);



