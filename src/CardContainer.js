import React, { Component } from 'react';
import Card from './Card.js';
import CompareContainer from './Compare.js'
import './CardContainer.css';

const CardContainer = ({ data, schools, filteredSchools, schoolsForComparison, comparedSchools, comparison, setComparedSchools, removeComparedSchool }) => {
  const allSchools = Object.keys(filteredSchools).map(school => {
    let yearlyStats = data.stats[school].stats
    const selectedCard = schoolsForComparison.includes(school) ? 'selected' : 'unselected'
    return <Card key={ school } yearlyStats={ yearlyStats } school={ school } setComparedSchools={ setComparedSchools } selectedCard={ selectedCard }/>
  })

  return (
    <div className='card-container'>
    {
      schoolsForComparison.length ? <CompareContainer schoolsForComparison={ schoolsForComparison } comparedSchools={ comparedSchools } removeComparedSchool={ removeComparedSchool } comparison={ comparison }/> : null
    }
      <div className='schools-container'>
        { allSchools }
      </div>
    </div>
  )
}

export default CardContainer
