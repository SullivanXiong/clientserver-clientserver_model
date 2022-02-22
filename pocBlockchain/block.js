class Block {
  constructor(index, timestamp, transactions, prevHash, hash) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = hash;
  }
}

class Transaction {
  constructor(from, to, amount, credit = 0, fromSignature, randomSeed) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.credit = credit;
    this.fromSignature = fromSignature;
    this.randomSeed = randomSeed;
    this.signatures = {};
  }
}

module.exports = {
  Block: Block,
  Transaction: Transaction,
};
