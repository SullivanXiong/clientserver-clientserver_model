const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");

const fs = require("fs");

async function writeNodeData(NODE_DATA) {
  await fs.writeFileSync(`./nodesDatabase/${NODE_DATA["node"]}_blockchain.json`, JSON.stringify(NODE_DATA));
}

function signMessage(key, message) {
  let messageHash = SHA256(message).toString(CryptoJS.enc.hex);
  return { messageHash: messageHash, signature: key.sign(messageHash) };
}

module.exports = {
  writeNodeData,
  signMessage,
};
