# knex-bookshelf-example

### To Run App Locally:

Create your database locally and add username and db name to `knexfile.js` development config object.

Run the following commands in order from the root of your project to create tables, seed tables and start node server.

1. Install dependencies
```
$ npm install or yarn install
```

2. Run migrations
```
$ knex migrate:latest
```

3. Run seed files
```
$ knex seed:run
```

4. Start server
```
$ node server.js

Server listening on port: 3000
```


Test existing endpoints on Postman!
