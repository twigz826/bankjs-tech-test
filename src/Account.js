'use strict';

const TransactionDate = require('./TransactionDate.js');
const PrintStatement = require('./PrintStatement.js');

class Account {
  constructor() {
    this.balance = 0;
    this._transactionHistory = [];
    this.date = new TransactionDate();
  }

  deposit(amount) {
    let dateOfDeposit = this.date.correctFormat();
    this._addToBalance(amount);
    this._transactionHistory.push(`${dateOfDeposit} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}\n`);
  }

  withdraw(amount, date = this.date.correctFormat()) {
    let dateOfWithdrawal = this.date.correctFormat();
    this._deductFromBalance(amount);
    this._transactionHistory.push(`${dateOfWithdrawal} || || ${amount.toFixed(2)} || ${this.balance.toFixed(2)}\n`);
  }

  printStatement() {
    let reversedHistory = this._transactionHistory.reverse();
    console.log("IN PRINT STATEMENT");
    console.log(reversedHistory);
    return new PrintStatement(reversedHistory)
  }

  // printAccountStatement() {
  //   let draftStatement = [this.statementHeader].concat(reversedHistory).join("");
  //   return draftStatement;
  // }

  _deductFromBalance(amount) {
    this.balance -= amount;
  }

  _addToBalance(amount) {
    this.balance += amount;
  }

}

module.exports = Account;
