'use strict';

class PrintStatement {
  constructor(transactions) {
    this.result = this.printAccountStatement(transactions);
  }

  printAccountStatement(transactions) {
    this.statementHeader = "date || credit || debit || balance\n";
    let draftStatement = [this.statementHeader].concat(transactions.reverse()).join("");
    return draftStatement;
  }

}

module.exports = PrintStatement;
