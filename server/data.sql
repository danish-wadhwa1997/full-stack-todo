CREATE DATABASE todo - app;
CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
INSERT INTO todos(id, user_email, title, progress, date)
VALUES(
        '0',
        'danish.wadhwa1@gmail.com',
        'first todo',
        10,
        'Tue Apr 25 2023 20 :26 :32 GMT + 0530 (India Standard Time)'
    );