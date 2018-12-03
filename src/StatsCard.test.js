import React from 'react';
import { shallow, mount } from 'enzyme'
import StatsCard from './StatsCard.js'

describe('StatsCard', () => {
  it('should match the snapshot', () => {
    const mockSchools = ['COLORADO', 'COLORADO SPRINGS 11']
    const mockComparison = {
      'COLORADO': 1,
      'COLORADO SPRINGS 11': 1,
      'compared': 1
    }
    const wrapper = shallow(<StatsCard schoolsForComparison={ mockSchools } comparison={ mockComparison }/>)

    expect(wrapper).toMatchSnapshot()
  })
})