const express = require("express");
const http = require("http");
const fs = require("fs");
const BlockChain = require("./pocBlockchain/blockchain.js");
const { Transaction } = require("./pocBlockchain/block.js");
const node = "node2";
const port = 7778;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let blockchain;
let peers;

fs.readFile(`./nodesDatabase/${node}_blockchain.json`, (err, raw_data) => {
  if (err) {
    console.error();
    return;
  }

  let data = JSON.parse(raw_data);
  peers = data.peers;
  blockchain = new BlockChain();
});

app.get("/", (req, res) => {
  res.send(block);
});

app.post("/syncPeerBlockchain", (req, res) => {
  req.json();

  res.send("Successful transaction submission.");
});

app.post("/receiveBlock", (req, res) => {
  data = req.body;
  console.log(data);
  res.send(`Successfully received block ${data}`);
});

app.post("/receiveTransaction", (req, res) => {
  data = req.body;
  console.log(data);
  res.send(`Successfully received block ${data}`);
});

app.listen(port, () => {
  console.log(`ClientServer Node listening at http://localhost:${port}`);
});
