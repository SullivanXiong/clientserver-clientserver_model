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
  constructor(from, to, amount, credit = 0) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.credit = credit;
  }
}

module.exports = {
  Block: Block,
  Transaction: Transaction,
};
