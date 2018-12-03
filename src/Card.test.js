import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('should have a class name of less than if the stat is less than 1'), () => {
    const wrapper = shallow(<Card key='school' yearlyStats={{'2004': .3}} school='BEAR CREEK'/>)

    expect(wrapper.find('li').hasClass('less-than')).toEqual(true)
  }

  it('should have a class name of less than is the stat is greater than 1'), () => {
    const wrapper = shallow(<Card key='school' yearlyStats={{'2004': 1}} school='BEAR CREEK'/>)

    expect(wrapper.find('li').hasClass('greater-than')).toEqual(true)
  }

  it('should return 1 child node', () => {
    const wrapper = shallow(<Card key='BEAR CREEK' yearlyStats={{'2004': .3}} school='BEAR CREEK' />)

    expect(wrapper.find('li').length).toEqual(1)
  })

  it('should match the snapshot with all the data passed in correctly', () => {
    const wrapper = shallow(<Card key='BEAR CREEK' yearlyStats={{'2004': .3}} school='BEAR CREEK' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should fire the setComparedSchools function on click', () => {
    const mockFunction = jest.fn()
    const wrapper = shallow(<Card key='BEAR CREEK' yearlyStats={{'2004': .3}} school='BEAR CREEK' setComparedSchools={ mockFunction }/>)

    wrapper.find('.school-card').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })

})