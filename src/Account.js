'use strict';

class Account {
  constructor() {
    this.balance = 0;
    this._transactionHistory = [];
    this.statementHeader = "date || credit || debit || balance\n";
    this.date = new TransactionDate();
  }

  deposit(amount, date = this.date.correctFormat()) {
    this._addToBalance(amount);
    this._transactionHistory.unshift(`${date} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}\n`);
  }

  withdraw(amount, date = this.date.dateCorrectFormat()) {
    this._deductFromBalance(amount);
    this._transactionHistory.unshift(`${date} || || ${amount.toFixed(2)} || ${this.balance.toFixed(2)}\n`);
  }

  printAccountStatement() {
    let draftStatement = [this.statementHeader].concat(this._transactionHistory).join("");
    return draftStatement;
  }

  _deductFromBalance(amount) {
    this.balance -= amount;
  }

  _addToBalance(amount) {
    this.balance += amount;
  }

}

class TransactionDate {
  constructor() {
    this.date = new Date();
  }

  correctFormat(){
    return `${this._dateGetDay()}/${this._dateGetMonth()}/${this._dateGetFullYear()}`
  }

  _dateGetDay(){
    return this.date.getDate().toString().padStart(2, '0')
  }

  _dateGetMonth(){
    let correctMonth = this.date.getMonth() + 1
    return correctMonth.toString().padStart(2, '0')
  }

  _dateGetFullYear(){
    return this.date.getFullYear();
  }
}

module.exports = Account;
