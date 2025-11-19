CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(50) NOT NULL,
    profile varchar(50) DEFAULT 'customer'
)