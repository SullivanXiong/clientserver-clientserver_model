const sha256 = require("crypto-js/sha256");
const { Block, Transaction } = require("./block.js");

class BlockChain {
  constructor(chain = []) {
    this.chain = chain;
    this.currentTransactions = [];
  }

  addNewBlock(prevHash) {
    let block = new Block(
      this.chain.length,
      Date.now(),
      this.currentTransactions,
      prevHash,
      0
    );

    if (block.index != 0)
      block.hash = `0x${sha256(JSON.stringify(Block)).toString()}`;

    this.chain.push(block);
    this.currentTransactions = [];
  }

  addNewTransaction(transaction) {
    this.currentTransactions.push(new Transaction(transaction));
  }

  addNewTransaction(from, to, amount) {
    this.currentTransactions.push(new Transaction(from, to, amount));
  }

  lastBlock() {
    return this.chain[this.chain.length - 1];
  }
}

module.exports = BlockChain;
