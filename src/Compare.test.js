import React from 'react';
import { shallow, mount } from 'enzyme';
import Compare from './Compare.js';

describe('Compare', () => {
  it('should match the snapshot', () => {
    const mockSchools = ['COLORADO', 'COLORADO SPRINGS 11']
    const mockCompare = {
      'COLORADO': {
        'location': 'COLORADO',
        'stats': {
          '2004': 1
        }
      },
      'COLORADO SPRINGS 11': {
        'location': 'COLORADO SPRINGS 11',
        'stats': {
          '2004': 1
        }
      }
    }
    const mockFunction = jest.fn()
    const mockComparison = {
      'COLORADO': .4,
      'COLORADO SPRINGS 11': .4,
      'compared': 1
    }
    const wrapper = shallow(<Compare schoolsForComparison={ mockSchools } comparedSchools={ mockCompare } removeComparedSchool={ mockFunction } comparison={ mockComparison }/>)

    expect(wrapper).toMatchSnapshot()
  })
})