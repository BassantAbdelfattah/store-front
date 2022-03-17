# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

- Index /products [GET]
- Create /products [POST] 
Request Body:
```bash
{
    "name" : "skirt",
    "price" : 200,
    "category" : "fashion"
}
```

- show /products/:id [GET]
- Update /products/:id [PUT] [token required]

Request Body:
```bash
{
    "name" : "dress",
    "price" : 200,
    "category" : "fashion"
}
```

- Delete /products/:id [DELETE] [token required]
- Products by category /products/category/:cat [GET] [token required]

#### Users
- Index /users [GET] [token required]
- Create /users [POST] [token required]
Request Body:
```bash
{
    "email": "bassant@gmail.com",
    "firstName": "Bassant",
    "lastName": "Ahmed",
    "password": "123456789"
}
```

- show /users/:id [GET] [token required]
- Update /users/:id [PUT] [token required]
Request Body:
```bash
{
    "email": "bassant.a@gmail.com",
    "firstName": "Bassant",
    "lastName": "Ahmed",
    "password": "123456789"
```
- Delete /users/:id [DELETE] [token required]
- Auth /users/auth [POST] 
Request Body:
```bash
{
      "email": "admin@admin.com",
      "password": "123456"
}
```

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

- Index /orders [GET] [token required]
- Create /orders [POST] [token required]

Request Body:
```bash

    {
    "products":[{
        "product_id": 1,
        "quantity" : 2
    },{
          "product_id": 2,
          "quantity" : 3 
    }],
    "user_id": 1,
    "status": "complete"
}

```

- show /orders/:id [GET] [token required]
- Update /orders/:id [PUT] [token required]
Request Body:
``` bash
{
    "products":[{
        "product_id": 1,
        "quantity" : 2
    }],
    "user_id": 1,
    "status": "complete"
}
```
- Delete /orders/:id [DELETE] [token required]
- Current Order by user /orders/current/users/:id [GET] [token required]
- Completed Orders by user /orders/complete/users/:id [GET] [token required]


## Data Shapes
#### Product
-  id
- name
- price
- category
```bash
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(12, 2) NOT NULL, 
  category VARCHAR(100)  NULL
);
```

#### User
- id
- email
- firstName
- lastName
- password
```bash
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

#### Orders
Table: orders
- id
- user_id
- status of order (active or complete)

```bash
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```

Table: order_products
- id
- order_id 
- product_id 
- quantity 
```bash
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```