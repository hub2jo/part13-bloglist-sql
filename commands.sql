CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
    VALUES (
        'Luka Ong', 
        'https://luga.ong.com.sg', 
        'dogs can code sql');

INSERT INTO blogs (author, url, title) 
    VALUES (
        'dan masters', 
        'https://dan.masters.com.sg', 
        'luka is a master of sql');

INSERT INTO blogs (author, url, title, likes) 
    VALUES (
        'luka masters', 
        'https://luka.masters.com.sg', 
        'luka is a master of everything', 
        5);