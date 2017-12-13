import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      term: 15,
      rate: 0,
    }
  }

  onChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value,
    });
  }

  /* balance: total loan amount
     rate: APR percentage
     term: number of payments to make
     period: no clue, but apparently it's required

  */
  calculate(balance, rate, term, period) {

    balance = Number(balance);
    rate = Number(rate);
    term = Number(term);
    period = Number(period);

    //convert percentages to decimal
    //and convert annual rates to monthly
    rate = rate / (12 * 100.0);
    term = term * 12;
    //do the complicated math
    return balance * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
  }

  handleButtonClick() {
    const out = this.refs.output;

    const payment = this.calculate(this.state.balance, this.state.rate, this.state.term, 0);

    out.innerHTML = `Your monthly payment is: $${payment.toFixed(2)}.`

  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <h3>Mortgage Calculator</h3>
        </div>
        <div className="row">
          <div className=".col-md-2">
            <label>
              Loan Balance ($)
              <input name="balance" type="text"
                value={this.state.balance} onChange={this.onChange.bind(this)} />
            </label>
          </div>

          <div className=".col-md-2">
            <label>
              Interest Rate (%)
                <input name="rate" type="number" step="0.01"
                value={this.state.rate} onChange={this.onChange.bind(this)} />
            </label>
          </div>
          <div className=".col-md-2">
            <label>
              Loan Term (Years)
                <select name="term" value={this.state.term} onChange={this.onChange.bind(this)}>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </label>
          </div>

          <div className=".col-md-2">
            <button className="btn btn-primary" name="submit" type="submit"
              onClick={this.handleButtonClick.bind(this)}>Submit</button>
          </div>
          <div name="output" ref="output" id="output"></div>

        </div>
      </div>
    );
  }
}
