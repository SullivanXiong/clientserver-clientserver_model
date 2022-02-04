const express = require("express");
const axios = require("axios");
const fs = require("fs");
const BlockChain = require("./pocBlockchain/blockchain.js");
const { Transaction } = require("./pocBlockchain/block.js");
const node = "node1";
const port = 7777;

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

function genesisBlock() {
  console.log("Creating genesis block and broadcasting it to peers...");
  const genesisTransaction = new Transaction(
    "0x00000000000000000000000000000000",
    "0x70000000000000000000000000000000",
    7,
    1
  );

  blockchain.addNewTransaction(genesisTransaction);
  blockchain.addNewBlock(0);
  console.log("Starting broadcasting genesis block to peers...");
  for (let peer of peers) {
    axios.post(`http://localhost:${peer}/receiveBlock`, blockchain.lastBlock());
  }
  console.log("Finished broadcasting genesis block to peers...");
}

app.get("/", (req, res) => {
  res.send(block);
});

app.post("/syncPeerBlockchain", (req, res) => {
  req.json();

  res.send("Successful transaction submission.");
});

app.post("/receiveBlock", (req, res) => {
  data = req.json();

  console.log(data);
  res.send(`Successfully received block ${data}`);
});

app.post("/receiveTransaction", (req, res) => {
  data = req.json();

  console.log(data);
  res.send(`Successfully received block ${data}`);
});

app.listen(port, () => {
  console.log(`ClientServer Node listening at https://localhost:${port}`);
});

process.stdin.on("data", (raw_stdin) => {
  let _stdin = raw_stdin.toString().trim();
  if (_stdin == "genesisBlock") {
    console.log("About to run genesisBlock()...");
    genesisBlock();
  }
});
