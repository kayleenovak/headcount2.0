import React from 'react';
import './StatsCard.css'

const StatsCard = (props) => {
  return (
    <div>
    {
      props.schoolsForComparison.length > 1 ? 
      <div className='stat-card'>
        <h3>{ props.schoolsForComparison[0] } average: { props.comparison[props.schoolsForComparison[0]] }</h3>
        <h2>Both schools compared: { props.comparison.compared }</h2>
        <h3>{ props.schoolsForComparison[1] } average: { props.comparison[props.schoolsForComparison[1]]}</h3>
      </div> : 
      null
    }
    </div>
  )
}

export default StatsCard