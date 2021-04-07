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

module.exports = TransactionDate;
