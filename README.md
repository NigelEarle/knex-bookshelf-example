# knex-bookshelf-example

To Run App Locally:

1. Create your database locally and add username and db name to `knexfile.js` development object.
2. Run migrations to create tables:

```bash
$ knex migrate:latest
```

3. Run seeds to populate tables:

```bash
$ knex seed:run
```

4. Start server and test endpoints through Postman:

```
$ node server.js

Server listening on port: 3000
```
