'use strict';

const Account = require('../src/Account.js');
const testDate = require('./helpers/testDate.js')

describe("Account", function() {

  let account;
  let date;

  beforeEach(function() {
    account = new Account();
    date = testDate();
  });

  it("should initialize with a balance of 0", function() {
    expect(account.balance).toEqual(0);
  });

  it("the balance changes depending on how much has been deposited/withdrawn", function(){
    account.deposit(500);
    account.withdraw(300);
    expect(account.balance).toEqual(200);
  })

  it("can handle decimal places", function(){
    account.deposit(238.12);
    account.withdraw(102.62);
    expect(account.balance).toEqual(135.50);
  })

  describe('deposit', function(){

    it("client can make a deposit which stores a credit entry and increases account balance", function(){
      account.deposit(500);
      expect(account._transactionHistory).toEqual([`${testDate()} || 500.00 || || 500.00\n`]);
      expect(account.balance).toEqual(500);
    })

    it("client can make multiple deposits that are stored in creditHistory", function(){
      account.deposit(500.67);
      account.deposit(1000.25);
      expect(account._transactionHistory[0]).toEqual(`${testDate()} || 500.67 || || 500.67\n`);
      expect(account._transactionHistory[1]).toEqual(`${testDate()} || 1000.25 || || 1500.92\n`);
    })

    it("default date of deposit is today if no date provided", function(){
      account.deposit(500);
      expect(account._transactionHistory[0]).toEqual(`${testDate()} || 500.00 || || 500.00\n`);
    })
  })

  describe('withdraw', function(){

    it("client can make a withdrawal which stores a debit entry and decreases the account balance", function(){
      account.withdraw(300);
      expect(account._transactionHistory).toEqual([`${testDate()} || || 300.00 || -300.00\n`]);
      expect(account.balance).toEqual(-300);
    })

    it("client can make multiple withdrawals that are stored in creditHistory", function(){
      account.withdraw(500);
      account.withdraw(1000);
      expect(account._transactionHistory[0]).toEqual(`${testDate()} || || 500.00 || -500.00\n`);
      expect(account._transactionHistory[1]).toEqual(`${testDate()} || || 1000.00 || -1500.00\n`);
    })

    it("default date of withdrawal is today if no date provided", function(){
      account.withdraw(500);
      expect(account._transactionHistory[0]).toEqual(`${testDate()} || || 500.00 || -500.00\n`);
    })
  })

  describe('printBankStatement', function(){

    it("client can print an empty bank statement", function(){
      expect(account.printStatement()).toEqual("date || credit || debit || balance\n");
    })

    it("client deposit gets added to the bank statement", function(){
      account.deposit(500);
      expect(account.printStatement()).toEqual(`date || credit || debit || balance\n${testDate()} || 500.00 || || 500.00\n`);
    })

    it("client withdrawal gets added to the bank statement", function(){
      account.withdraw(1000);
      expect(account.printStatement()).toEqual(`date || credit || debit || balance\n${testDate()} || || 1000.00 || -1000.00\n`);
    })

    it("a mix of deposits and withdrawals can be added to the bank statement", function(){
      account.deposit(8517.22);
      account.withdraw(2399.78);
      expect(account.printStatement()).toEqual(`date || credit || debit || balance\n${testDate()} || || 2399.78 || 6117.44\n${testDate()} || 8517.22 || || 8517.22\n`);
    })

  })

});
