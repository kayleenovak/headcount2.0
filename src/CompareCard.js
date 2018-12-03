import React from 'react';
import './CompareCard.css'

const CompareCard = (props) => {
  console.log('Compare card props',  props)
  const stats = Object.keys(props.schoolStats).map(stat => {
    return <li className={props.schoolStats[stat] >= 1 ? 'greater-than' : 'less-than'}>{ stat }: { props.schoolStats[stat] }</li>
  })
  return (
    <div className='compare-card' onClick={ props.removeCompare }>
      <h3>{ props.school }</h3>
      <button onClick={ props.removeComparedSchool } id={ props.school }>Delete</button>
      { stats }
    </div>
    )
}

export default CompareCard