'use strict';

class PrintStatement {
  constructor(transactions) {
    this.printAccountStatement(transactions);
  }

  printAccountStatement(transactions) {
    this.statementHeader = "date || credit || debit || balance\n";
    let draftStatement = [this.statementHeader].concat(transactions).join("");
    return draftStatement;
  }

}

module.exports = PrintStatement;
