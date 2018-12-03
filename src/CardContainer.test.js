import React from 'react';
import { shallow, mount } from 'enzyme';
import CardContainer from './CardContainer.js';
import App from './App.js';
import Card from './Card.js'

describe('CardContainer', () => {
  it('returns an array of schools', () => {
    const mockData = {
      stats: {
        'COLORADO': {
          'location': 'COLORADO',
          'stats': {
            '2004': .04,
            '2005': .04
          }
        },
        'COLORADO SPRINGS 11': {
          'location': 'COLORADO SPRINGS 11',
          'stats': {
            '2004': .04,
            '2005': .05
          }
        }
      }
    }
    const mockComparison = {
      schoolsForComparison: ['COLORADO']
    }
    const wrapper = mount(<CardContainer data={ mockData } schoolsForComparison={ mockComparison }/>)
    expect(wrapper.find(Card).length).toEqual(2)
  })
})