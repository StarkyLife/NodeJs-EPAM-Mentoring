**curls**

-----------------------
_USERS_
-----------------------

GET user: `curl http://localhost:8080/users/2`\
POST: `curl http://localhost:8080/users -X POST -H "Content-Type: application/json" -d @./src/test-user.json`\
DELETE: `curl http://localhost:8080/users/2 -X DELETE`\
GET user-autosuggestion: `curl http://localhost:8080/users\?search\=k\&limit\=4`\

-----------------------
_GROUPS_
-----------------------

GET group: `curl http://localhost:8080/groups/2`\
GET all groups: `curl http://localhost:8080/groups`\
POST: `curl http://localhost:8080/groups -X POST -H "Content-Type: application/json" -d '{ "name": "users", "permissions": ["READ"] }'`\
DELETE: `curl http://localhost:8080/groups/2 -X DELETE`\
POST add users to group: `curl http://localhost:8080/groups/2/users/add -X POST -H "Content-Type: application/json" -d '["1"]'`

------------------------
_AUTH__
------------------------

LOGIN: `curl http://localhost:8080/login -X POST -H "Content-Type: application/json" -d '{ "login": "starky", "password": "pass" }'`\

-----------------------------
**Woring with Postgres**
-----------------------------

`brew services start postgres` - start\
`brew services stop postgres` - stop\
`psql postgres` - connect to database (name: postgres)

```
\l - list all databases
\d - list all tables

CREATE DATABASE mydb; (sql for creating new database)
\c - reconnect to another db

\i src/data-access/create-users-table.sql - execute sql-script

\conninfo - get current connection info (`port` and etc.)

\q - quit the database
```
