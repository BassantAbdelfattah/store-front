/* Replace with your SQL commands */
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);



