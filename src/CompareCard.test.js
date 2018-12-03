import React from 'react';
import { shallow, mount } from 'enzyme';
import CompareCard from './CompareCard.js'

describe('Compare Card', () => {
  it('should match the snapshot', () => {
    const mockFunction = jest.fn()
    const mockSchools = ['COLORADO']
    const mockStats = {
      '2004': 1,
      '2005': 1
    }
    const wrapper = shallow(<CompareCard removeComparedSchool={ mockFunction } school={ mockSchools[0] } schoolStats={ mockStats } />)

    expect(wrapper).toMatchSnapshot()
  })
})