/* Replace with your SQL commands */
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(12, 2) NOT NULL, 
  category VARCHAR(100)  NULL
);