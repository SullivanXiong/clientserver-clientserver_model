const fs = require("fs");

async function writeNodeData(NODE_DATA) {
  await fs.writeFileSync(`./nodesDatabase/${NODE_DATA["node"]}_blockchain.json`, JSON.stringify(NODE_DATA));
}

module.exports = {
  writeNodeData,
};
