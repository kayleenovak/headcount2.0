import React, { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }

  handleChange = (e) => {
    const inputValue = e.target.value
    this.setState({
      inputValue
    })
    this.props.populateSchools(inputValue)
  }

  render() {
    return (
      <form>
        <input className='search-input' type='text' value={ this.state.inputValue } placeholder='Search for a school district here' onChange={ this.handleChange }/>
      </form>
    )
  }
}