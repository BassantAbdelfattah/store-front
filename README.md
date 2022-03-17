# Storefront Backend Project

This is a backend API build in Nodejs for an online store.
The database schema and and API route information can be found in the `REQUIREMENTS.md`


## Install Package
npm install

## Set up
First, create a .env :
```bash
ENV=dev
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=storeFront_dev
DB_DATABASE_TEST=storeFront_test
DB_USER=postgres
DB_PASS=password
BCRYPT_PASSWORD=secret_pass
SALT_ROUNDS=10
TOKEN_SECRET=secret_token
```
Next, start the Postgres server on Docker:

```bash
docker-compose up
```

Connect to Postgres container and login to create storeFront_dev and storeFront_test

```bash
docker container ls
docker exec -it <postgres_container_id> bash
psql -U postgres 
create database storeFront_dev; 
create database storeFront_test; 
```

Next, run migration 
```bash  
npm run migrate-up
 ``` 
Next, run build 
```bash  
npm run build
 ``` 
 
Next, run seed to create user
```bash  
npm run seed
 ``` 


## Start the application

  run watch 
```bash  
npm run watch
 ``` 
 run start to run the app
```bash  
npm run start
 ``` 
 The application will run on http://localhost:3000/.
## Testing

```bash  
npm run test
 ``` 