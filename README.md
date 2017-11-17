# knex-bookshelf-example

### To Run App Locally:

Create your database locally and add username and db name to `knexfile.js` development object.

Run the following commands from the root of your project to create tables, seed tables and start node server.

```bash
$ knex migrate:latest

$ knex seed:run

$ node server.js

Server listening on port: 3000
```
