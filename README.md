# Bank tech test challenge

## Specification

### Requirements

* You should be able to interact with your code via a REPL like IRB or the JavaScript console.  (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see

```
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

## How to use the app

Clone the current repository

```
$ git clone https://github.com/twigz826/bank-tech-test.git
```

Go to the root directory of the cloned repo and install the required Node packages

```
$ npm install
```

The app can be run from the console in the browser


## Setting up an account

#### Create an instance of the Account Class


```
account = new Account()
```

#### Make a deposit including the date of deposit

```
$ account.deposit("01/02/2021", 500);
```

#### Make a withdrawal including the date of withdrawal

```
$ account.withdraw("09/02/2021", 100);
```

#### Check the current balance on the account

```
$ account.balance;
```

#### Print an account statement

```
$ account.printBankStatement();
```

## How to run the tests

The project uses jasmine to test the code base, there are 11 tests that can be run through the following command:

```
$ open SpecRunner.html
```

To include the test coverage, run the following command:

```
$ karma start karma-config.js
```

### Tech stack

The application was written in javascript, with Jasmine as the testing framework and Karma being used to assess the test coverage. ESlint was the linter of choice.

### Design

**Balance variable**  
- Stores the balance on the account to two decimal places

**Transaction History array**  
- Stores all transactions as a string formatted to reflect the project specifications   
- Transactions have a date, an amount and a balance

**Withdraw function**  
- Accepts two arguments: date and amount   
- Adds transaction to the transactionHistory array
- Updates the balance

**Deposit function**  
- Accepts two arguments: date and amount   
- Adds transaction to the transactionHistory array
- Updates the balance

**Print Account Statement function**  
- Generates a statement detailing all transactions made on the account

## Log of key decisions

### Monday afternoon

After my fourth test passed, I realised I needed to refactor because the way I was currently writing tests/code is not storing deposit/withdrawal entries but rather just updating the balances, which is not what the spec requires.

### Tuesday morning

I was previously storing my transaction entries in two separate arrays, I realised on Tuesday morning that it would be much better to store all entries in one array.

Unshift was determined to be a better way of storing transaction entries in the hash (instead of push) because it stores the most recent entry at the start of the array. Minor refactor of code was necessary to achieve this.

Storing my transaction entries as a hash quickly started to become unviable as they aren't stored as key value pairs in the bank statement. This could have been avoided through more careful planning, MUST PLAN MORE IN FUTURE..

I am still unsure whether it is better practice to define variables as const's at the top of the script, or whether it is acceptable to have them grouped in the constructor. For now, I have chosen the latter.

I added some additional tests to ensure decimal places were working correctly and there was no issue with the built in javascript method I decided to use.

## Edge cases

I considered a number of edge cases that I would like to test and implement in this app at a future date:

  1. Account balance cannot be negative, clients are prevented from making withdrawals if it would leave them with a negative bank balance.

  2. If a date has not been input, the date would default to today's date.

  3. If a user accidentally inputs a string instead of a number, they receive a warning to ensure they are inputting a number and the entry is not saved.

## Potential additional features

Front-end user interface written in vanilla javascript

Splitting the bank statement from the deposit/withdraw functions into a separate class, although currently I do not see much merit in doing this.
