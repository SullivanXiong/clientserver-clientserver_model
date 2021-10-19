const express = require("express");
const http = require("http");
const ports = [3000, 3001, 3002];
const nodes = [];
ports.forEach(
  (port) =>
    nodes.push({
      app: express(),
      port: port,
      peers: ports.filter((peer) => peer != port),
    })
);
const initRoutes = require("./nodeRoutes/nodeInit/init.js");


for (let node of nodes) {
    let app = node["app"];
    let port = node["port"];
    let peers = node["peers"];

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.post("/ReceiveMessage", (req, res) => {
        let body = req.body;
        let peerMessage = body.message;

        console.log(`peer ${body.peer} got the message from ${body.port}!`);
        console.log(`${peerMessage}`);
    });

    app.post("/message", (req, res) => {
        peers.forEach((peer) => {
            let message = `hello neighbor! this is ${port}`;
            let body = JSON.stringify({
                message: message,
                port: port,
                peer: peer
            });
            let options = {
                hostname: 'localhost',
                port: peer,
                path: '/ReceiveMessage',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            }
            
            let outgoingReq = http.request(options, (reply, err) => {
                if (reply) {
                    console.log(`got reply from ${peer}`);
                } else {
                    console.log(err);
                    console.log(`${peer} did not receive message.`);
                }
            });
            outgoingReq.write(body);
            outgoingReq.end();
        });

        res.send("Successful message submission.");
    });

    app.post("/transaction", (req, res) => {
        peers.forEach((peer) => {
        let url = "http://localhost:{}/transaction";
        });

        res.send("Successful transaction submission.");
    });

    app.listen(port, () => {
        console.log(`ClientServer Node listening at http://localhost:${port}`);
    });
}