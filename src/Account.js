'use strict';

const TransactionDate = require('./TransactionDate.js');

class Account {
  constructor() {
    this.balance = 0;
    this._transactionHistory = [];
    this.statementHeader = "date || credit || debit || balance\n";
    this.date = new TransactionDate();
  }

  deposit(amount, date = this.date.correctFormat()) {
    this._addToBalance(amount);
    this._transactionHistory.push(`${date} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}\n`);
  }

  withdraw(amount, date = this.date.correctFormat()) {
    this._deductFromBalance(amount);
    this._transactionHistory.push(`${date} || || ${amount.toFixed(2)} || ${this.balance.toFixed(2)}\n`);
  }

  printAccountStatement() {
    let reversedHistory = this._transactionHistory.reverse();
    let draftStatement = [this.statementHeader].concat(reversedHistory).join("");
    return draftStatement;
  }

  _deductFromBalance(amount) {
    this.balance -= amount;
  }

  _addToBalance(amount) {
    this.balance += amount;
  }

}

module.exports = Account;
