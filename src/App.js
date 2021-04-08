import './App.css';
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const api = "https://openfisca-uk.herokuapp.com";
const cors = "https://cors-escape.herokuapp.com/";

function App() {
  const root = {
    flexGrow: 1,
  }
  return (
    <div style={root}>
      <AppBar position="static" style={{marginBottom: 20}}>
        <Toolbar>
          <Typography variant="h6">
            UK Tax-Benefit Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <VariableGrid />
      </Container>
    </div>
    
  )
}

class VariableGrid extends React.Component {
  constructor(props) {
    super(props);
    let situation_data = {
      people: {
        person: {
          age: {2020: null},
          earnings: {2020: null},
          profit: {2020: null},
          rental_income: {2020: null},
          state_pension: {2020: null},
          pension_income: {2020: null},
          income_tax: {2020: null},
          NI: {2020: null},
          personal_allowance: {2020: null},
          taxable_income: {2020: null},
          taxable_income_deductions: {2020: null},
          total_tax: {2020: null},
          
        }
      },
      benunits: {
        benunit: {
          adults: ["person"]
        }
      },
      households: {
        household: {
          adults: ["person"],
          household_net_income: {2020: null},
        }
      }
    }
    let calculated_data = Object.assign({}, situation_data);
    this.state = {
      situation_data: situation_data,
      calculated_data: calculated_data
    };
    this.updatePersonField = this.updatePersonField.bind(this);
    this.updateBenunitField = this.updateBenunitField.bind(this);
    this.updateHouseholdField = this.updateHouseholdField.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    fetch(api + "/calculate", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.situation_data)
    }).then(res => res.json()).then(data => this.setState({calculated_data: data}));
  }

  componentDidMount() {
    this.updateData();
  }

  updatePersonField(event, newKey, newValue) {
    let data = this.state.situation_data;
    data.people.person[newKey] = {2020: +newValue};
    this.setState({situation_data: data});
    this.updateData();
  } 

  updateBenunitField(event, newKey, newValue) {
    let data = this.state.situation_data;
    data.benunits.benunit[newKey] = {2020: +newValue};
    this.setState({situation_data: data});
  } 

  updateHouseholdField(event, newKey, newValue) {
    let data = this.state.situation_data;
    data.households.household[newKey] = {2020: newValue ? +newValue : null};
    this.setState({situation_data: data ? data : null});
  } 

  render() {
    const getFields = obj => Object.entries(obj).map(x => (x[0] !== "adults") ? <Variable key={x[0]} name={x[0]} value={Object.entries(x[1])[0][1]} changeHandler={(e) => this.updatePersonField(e, x[0], e.target.value)} /> : null);
    return (
      <div>
        <h2>Person</h2>
        <Grid container spacing={3}>
          {getFields(this.state.calculated_data.people.person)}
        </Grid>
        <h2>Benunit</h2>
        <Grid container spacing={3}>
          {getFields(this.state.calculated_data.benunits.benunit)}
        </Grid>
        <h2>Household</h2>
        <Grid container spacing={3}>
          {getFields(this.state.calculated_data.households.household)}
        </Grid>
      </div>
    )
  }
}

class Variable extends React.Component {

  render() {
    const style = {
      minWidth: 100,
      margin: 10,
      padding: 10,
      textAlign: 'center',
      color: "black",
    }
    return (
      <Paper style={style}>
        <h3>{this.props.name}</h3>
        <TextField label={this.props.value} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            this.props.changeHandler(e)
            e.preventDefault();
          }
        }} />
      </Paper>
    )
  }
}
export default App;