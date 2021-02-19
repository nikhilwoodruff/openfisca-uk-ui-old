import logo from './logo.svg';
import './App.css';
import React from 'react';
import Slider from '@material-ui/core/Slider';

let api = "https://openfisca-uk.herokuapp.com"

function App() {
  return (
    <div>
      <h1>Household Net Income Calculator</h1>
      <Main />
    </div>
  )
}

class Main extends React.Component {
    constructor() {
      super()
      this.state = {salary: 0, result: "Computing"};
      this.handleChange = this.handleChange.bind(this);
      this.updateHNet = this.updateHNet.bind(this);
    }

    handleChange(event, newValue) {
      let timeout;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.setState({salary: newValue});
        this.updateHNet();
      }, 100);
    }

    updateHNet() {
      let data = {
        people: {
          person1: {
            age: {2020: 18},
            earnings: {2020: this.state.salary}
          }
        },
        benunits: {
          benunit: {
            adults: ["person1"]
          }
        },
        households: {
          household: {
            adults: ["person1"],
            household_net_income: {2020: null}
          }
        }
      }
      fetch(api + "/calculate", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(result => result.json()).then(data => this.setState({result: data.households.household.household_net_income[2020]}))

    }

    componentDidMount() {
      this.updateHNet();
    }

    render() {
      return <div>
        <Slider min={0} max={100000} step={100} onChange={this.handleChange}/>
        <h3>Your earnings: {this.state.salary}, your household net income: {this.state.result}</h3>
      </div>
      
    }
}

export default App;
