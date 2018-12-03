import React, { Component } from 'react';
import './Card.css';
import'./CardContainer.css'

const Card = (props) => {
  const yearStats = Object.keys(props.yearlyStats).map(year => {
    return <li className={props.yearlyStats[year] >= 1 ? 'greater-than' : 'less-than'} key={ year }>{ year }: { props.yearlyStats[year] }</li>
  })

  return(
    <div className='school-card' id={ props.school } onClick={ props.setComparedSchools }>
      <h2 className='school'>{ props.school }</h2>
        { yearStats }
    </div>
  )

}

export default Card