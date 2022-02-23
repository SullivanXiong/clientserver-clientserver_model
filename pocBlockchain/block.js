class Block {
  constructor(index, timestamp, transactions, prevHash, hash, randomSeed) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = hash;
    this.randomSeed = randomSeed;
    this.signatures = {};
  }
}

class Transaction {
  constructor(from, to, amount, credit = 0) {
    this.body = {};
    this.body.from = from;
    this.body.to = to;
    this.body.amount = amount;
    this.body.credit = credit;
  }

  setSignature(signature) {
    this.signature = signature;
  }
}

module.exports = {
  Block: Block,
  Transaction: Transaction,
};
