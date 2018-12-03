import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer.js';
import DistrictRepository from './helper.js';
import Search from './Search.js';
import Compare from './Compare.js';
import kinderData from './data/kindergartners_in_full_day_program.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: new DistrictRepository(kinderData),
      schools: [],
      filteredSchools: {},
      schoolsForComparison: [],
      comparedSchools: {},
      comparison: {}
    }
  }

  componentDidMount() {
    this.populateSchools()
  }

  setComparedSchools = (e) => {
    const school = e.target.id
    const schoolStats = {
      ...this.state.comparedSchools,
      [school]: {
        stats: this.state.data.stats[school].stats
      } 
    }
    if(this.state.schoolsForComparison.length <= 1) {
      this.setState({
        schoolsForComparison: [...this.state.schoolsForComparison, school],
        comparedSchools: schoolStats
      }, () => {
        this.compareSchools()
      })
    }
  }

  compareSchools = () => {
    const schoolOne = this.state.schoolsForComparison[0]
    const schoolTwo = this.state.schoolsForComparison[1]
    if(this.state.schoolsForComparison.length > 1) {
      this.setState({
        comparison: this.state.data.compareDistrictAverages(schoolOne, schoolTwo)
      })
    }
  }

  removeComparedSchool = (e) => {
    const deletedSchool = e.target.id
    const schoolsForComparison = this.state.schoolsForComparison.filter(school => {
      return school !== deletedSchool
    })
    const comparedSchools = {
      [schoolsForComparison[0]]: this.state.data.stats[schoolsForComparison[0]]
    }
    this.setState({
      schoolsForComparison: schoolsForComparison ? schoolsForComparison : [],
      comparedSchools
    })
  }

  populateSchools = (string) => {
    const schools = this.state.data.findAllMatches(string);
    const filteredSchools = schools.reduce((acc, school) => {
      acc[school] = this.state.data.stats[school]
      return acc
    }, {})
    this.setState({
      schools,
      filteredSchools
    })
  }

  render() {
    return (
      <div className='app'>
        <h1 className='app-name'>Headcount</h1>
        <Search populateSchools={ this.populateSchools }/>
        {
          this.state.schools.length ? <CardContainer { ...this.state } setComparedSchools={ this.setComparedSchools } removeComparedSchool={ this.removeComparedSchool }/> : null
        }
      </div>
    );
  }
}

export default App;
