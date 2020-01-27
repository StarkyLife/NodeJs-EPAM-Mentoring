**curls**

GET user: `curl http://localhost:8080/user/2`
POST: `curl http://localhost:8080/user -X POST -H "Content-Type: application/json" -d @./src/test-user.json`
DELETE: `curl http://localhost:8080/user/2 -X DELETE`

GET user-autosuggestion: `curl http://localhost:8080/user-suggest\?search\=k\&limit\=4`