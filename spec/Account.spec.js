'use strict';

const Account = require('../src/Account.js');

describe("Account", function() {

  let account;
  beforeEach(function() {
    account = new Account();
  });

  it("should initialize with a balance of 0", function() {
    expect(account.balance).toEqual(0);
  });

  it("the balance changes depending on how much has been deposited/withdrawn", function(){
    account.deposit(500, "01/03/2021");
    account.withdraw(300, "07/03/2021");
    expect(account.balance).toEqual(200);
  })

  it("can handle decimal places", function(){
    account.deposit(238.12, "01/03/2021");
    account.withdraw(102.62, "07/03/2021");
    expect(account.balance).toEqual(135.50);
  })

  describe('deposit', function(){

    it("client can make a deposit which stores a credit entry and increases account balance", function(){
      account.deposit(500, "01/03/2021");
      expect(account._transactionHistory).toEqual(["01/03/2021 || 500.00 || || 500.00\n"]);
      expect(account.balance).toEqual(500);
    })

    it("client can make multiple deposits that are stored in creditHistory", function(){
      account.deposit(500.67, "01/02/2021");
      account.deposit(1000.25, "11/02/2021");
      expect(account._transactionHistory[0]).toEqual("01/02/2021 || 500.67 || || 500.67\n");
      expect(account._transactionHistory[1]).toEqual("11/02/2021 || 1000.25 || || 1500.92\n");
    })

    it("default date of deposit is today if no date provided", function(){
      account.deposit(500);
      expect(account._transactionHistory[0]).toEqual("07/04/2021 || 500.00 || || 500.00\n");
    })
  })

  describe('withdraw', function(){

    it("client can make a withdrawal which stores a debit entry and decreases the account balance", function(){
      account.withdraw(300, "07/03/2021");
      expect(account._transactionHistory).toEqual(["07/03/2021 || || 300.00 || -300.00\n"]);
      expect(account.balance).toEqual(-300);
    })

    it("client can make multiple withdrawals that are stored in creditHistory", function(){
      account.withdraw(500, "01/02/2020");
      account.withdraw(1000, "11/02/2020");
      expect(account._transactionHistory[0]).toEqual("01/02/2020 || || 500.00 || -500.00\n");
      expect(account._transactionHistory[1]).toEqual("11/02/2020 || || 1000.00 || -1500.00\n");
    })

    it("default date of withdrawal is today if no date provided", function(){
      account.withdraw(500);
      expect(account._transactionHistory[0]).toEqual("07/04/2021 || || 500.00 || -500.00\n");
    })
  })

  describe('printBankStatement', function(){

    it("client can print an empty bank statement", function(){
      expect(account.printAccountStatement()).toEqual("date || credit || debit || balance\n");
    })

    it("client deposit gets added to the bank statement", function(){
      account.deposit(500, "01/02/2021");
      expect(account.printAccountStatement()).toEqual("date || credit || debit || balance\n01/02/2021 || 500.00 || || 500.00\n");
    })

    it("client withdrawal gets added to the bank statement", function(){
      account.withdraw(1000, "09/03/2021");
      expect(account.printAccountStatement()).toEqual("date || credit || debit || balance\n09/03/2021 || || 1000.00 || -1000.00\n");
    })

    it("a mix of deposits and withdrawals can be added to the bank statement", function(){
      account.deposit(8517.22, "02/03/2021");
      account.withdraw(2399.78, "09/03/2021");
      expect(account.printAccountStatement()).toEqual("date || credit || debit || balance\n09/03/2021 || || 2399.78 || 6117.44\n02/03/2021 || 8517.22 || || 8517.22\n");
    })

  })

});
