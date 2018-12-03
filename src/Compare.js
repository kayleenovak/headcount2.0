import React from 'react';
import CompareCard from './CompareCard.js';
import StatsCard from './StatsCard.js'
import './Compare.css';

const CompareContainer = (props) => {
  return (
    <div class='compare-container'>
      <CompareCard removeComparedSchool={ props.removeComparedSchool } school={ props.schoolsForComparison[0] } schoolStats={ props.comparedSchools[props.schoolsForComparison[0]].stats } />
      <StatsCard schoolsForComparison={ props.schoolsForComparison } comparison={ props.comparison }/>

      {
        props.schoolsForComparison.length > 1 ? <CompareCard removeComparedSchool={ props.removeComparedSchool } school={ props.schoolsForComparison[1] } schoolStats={ props.comparedSchools[props.schoolsForComparison[1]].stats } /> : null
      }
    </div>
  )
}

export default CompareContainer

