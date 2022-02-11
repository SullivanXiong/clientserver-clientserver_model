const express = require("express");
const axios = require("axios");
const fs = require("fs");
const BlockChain = require("./pocBlockchain/blockchain.js");
const { Transaction } = require("./pocBlockchain/block.js");
const { writeNodeData } = require("./utility.js");
var path = require("path");
var scriptName = path.basename(__filename);
const node = scriptName.split("_")[0];
const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let NODE_DATA = {};
let key;

async function init() {
  let data = JSON.parse(await fs.readFileSync(`./nodesDatabase/${node}_blockchain.json`));
  NODE_DATA["node"] = data.node;
  NODE_DATA["peers"] = data.peers;
  NODE_DATA["port"] = data.port;
  NODE_DATA["walletDetails"] = data.walletDetails;

  NODE_DATA["blockchain"] = new BlockChain();
  if (data.blockchain.chain?.length > 0) NODE_DATA["blockchain"]["chain"] = data.blockchain.chain;

  key = ec.keyFromPrivate(SHA256(data.walletDetails.seedPhrase).toString());

  app.listen(data.port, () => {
    console.log(`ClientServer Node listening at https://localhost:${data.port}`);
  });
}

async function genesisBlock() {
  console.log("Creating genesis block and broadcasting it to peers...");
  const genesisTransaction = new Transaction(
    "0x00000000000000000000000000000000",
    "0x70000000000000000000000000000000",
    7,
    1,
    "0x00000000000000000000000000000000"
  );

  NODE_DATA["blockchain"].addNewTransaction(genesisTransaction);
  NODE_DATA["blockchain"].addNewBlock(0);
  writeNodeData(NODE_DATA);
}

async function collectBlockchainFromPeer() {
  console.log("Creating genesis block and broadcasting it to peers...");

  for (let peer of NODE_DATA["peers"]) {
    let rawData = (await axios.post(`http://localhost:${peer}/syncPeerBlockchain`)).data;

    if (NODE_DATA["blockchain"]["chain"] == undefined) {
      NODE_DATA["blockchain"] = rawData;
    } else if (rawData.chain?.length > NODE_DATA["blockchain"].chain?.length) {
      NODE_DATA["blockchain"] = rawData;
    }
  }

  writeNodeData(NODE_DATA);
}

app.get("/", (req, res) => {
  res.send(block);
});

app.get("/blockchain", (req, res) => {
  res.send(NODE_DATA["blockchain"]);
});

app.post("/syncPeerBlockchain", (req, res) => {
  let fromBlock = req.body.fromBlock;
  res.json(NODE_DATA["blockchain"]);
});

app.post("/receiveBlock", (req, res) => {
  console.log(data);
  res.send(`Successfully received block ${data}`);
});

app.post("/receiveTransaction", (req, res) => {
  console.log(data);
  res.send(`Successfully received block ${data}`);
});

init();

process.stdin.on("data", (raw_stdin) => {
  let _stdin = raw_stdin.toString().trim();
  if (_stdin == "genesisBlock") {
    genesisBlock();
  } else if (_stdin == "getBlockChain") {
    collectBlockchainFromPeer();
  }
});
