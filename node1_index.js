const express = require("express");
const axios = require("axios");
const fs = require("fs");
const BlockChain = require("./pocBlockchain/blockchain.js");
const { Transaction } = require("./pocBlockchain/block.js");
var path = require("path");
var scriptName = path.basename(__filename);
const node = scriptName.split("_")[0];
const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let blockchain;
let peers;
let key;
let port;

async function init() {
  let data = JSON.parse(await fs.readFileSync(`./nodesDatabase/${node}_blockchain.json`));
  peers = data.peers;
  port = data.port;

  key = ec.keyFromPrivate(SHA256(data.walletDetails.seedPhrase).toString());
  blockchain = new BlockChain();

  app.listen(port, () => {
    console.log(`ClientServer Node listening at https://localhost:${port}`);
  });
}

function genesisBlock() {
  console.log("Creating genesis block and broadcasting it to peers...");
  const genesisTransaction = new Transaction(
    "0x00000000000000000000000000000000",
    "0x70000000000000000000000000000000",
    7,
    1,
    "0x00000000000000000000000000000000"
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

init();

process.stdin.on("data", (raw_stdin) => {
  let _stdin = raw_stdin.toString().trim();
  if (_stdin == "genesisBlock") {
    console.log("About to run genesisBlock()...");
    genesisBlock();
  }
});
