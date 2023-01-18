// const http = require("http");
// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.write(req.url)
//     res.end()
// })

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`)
// })

// const http = require("http");
// const Todo = require("./controller");
// const { getReqData } = require("./utils");

// const PORT = process.env.PORT || 3000;

// const server = http.createServer(async (req, res) => {
//     // /api/todos : GET
//     if (req.url === "/api/todos" && req.method === "GET") {
//         // get the todos.
//         const todos = await new Todo().getTodos();
//         // set the status code, and content-type
//         res.writeHead(200, { "Content-Type": "application/json" });
//         // send the data
//         res.end(JSON.stringify(todos));
//     }

//     // /api/todos/:id : GET
//     else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
//         try {
//             // get id from url
//             const id = req.url.split("/")[3];
//             // get todo
//             const todo = await new Todo().getTodo(id);
//             // set the status code and content-type
//             res.writeHead(200, { "Content-Type": "application/json" });
//             // send the data
//             res.end(JSON.stringify(todo));
//         } catch (error) {
//             // set the status code and content-type
//             res.writeHead(404, { "Content-Type": "application/json" });
//             // send the error
//             res.end(JSON.stringify({ message: error }));
//         }
//     }

//     // /api/todos/:id : DELETE
//     else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
//         try {
//             // get the id from url
//             const id = req.url.split("/")[3];
//             // delete todo
//             let message = await new Todo().deleteTodo(id);
//             // set the status code and content-type
//             res.writeHead(200, { "Content-Type": "application/json" });
//             // send the message
//             res.end(JSON.stringify({ message }));
//         } catch (error) {
//             // set the status code and content-type
//             res.writeHead(404, { "Content-Type": "application/json" });
//             // send the error
//             res.end(JSON.stringify({ message: error }));
//         }
//     }

//     // /api/todos/:id : UPDATE
//     else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
//         try {
//             // get the id from the url
//             const id = req.url.split("/")[3];
//             // update todo
//             let updated_todo = await new Todo().updateTodo(id);
//             // set the status code and content-type
//             res.writeHead(200, { "Content-Type": "application/json" });
//             // send the message
//             res.end(JSON.stringify(updated_todo));
//         } catch (error) {
//             // set the status code and content type
//             res.writeHead(404, { "Content-Type": "application/json" });
//             // send the error
//             res.end(JSON.stringify({ message: error }));
//         }
//     }

//     // /api/todos/ : POST
//     else if (req.url === "/api/todos" && req.method === "POST") {
//         // get the data sent along
//         let todo_data = await getReqData(req);
//         // create the todo
//         let todo = await new Todo().createTodo(JSON.parse(todo_data));
//         // set the status code and content-type
//         res.writeHead(200, { "Content-Type": "application/json" });
//         //send the todo
//         res.end(JSON.stringify(todo));
//     }

//     // No route present
//     else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "Route not found" }));
//     }
// });

// server.listen(PORT, () => {
//     console.log(`server started on port: ${PORT}`);
// });

// Postgres

const express = require('express')
const bodyParser = require('body-parser')
const req = require('express/lib/request')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`App runnin on ${port}`)
})