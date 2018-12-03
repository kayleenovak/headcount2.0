import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './Search.js'

describe('Search', () => {
  it('should match snapshot', () => {
    const mockSubmit = jest.fn();

    const wrapper = shallow(<Search populateSchools={ mockSubmit }/>)

    expect(wrapper).toMatchSnapshot()
  })

  it('should fire handleChange on change of input and update state', () => {
    const mockEvent = { preventDefault() {},
     target: { value: 'abc' }
    }
    const mockChange = jest.fn()
    const wrapper = mount(<Search populateSchools={ mockChange }/>)
    const spy = spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    wrapper.find('input').simulate('change', mockEvent)

    expect(spy).toBeCalled()
  })

  it('should update state when a change is made in the input', () => {
    const mockEvent = { preventDefault() {},
     target: { value: 'abc' }
      }
    const expectedState = {
      'inputValue': 'abc'
      }
    const mockChange = jest.fn()
    const wrapper = mount(<Search populateSchools={ mockChange }/>)
    const spy = spyOn(wrapper.instance(), 'handleChange')

    wrapper.find('input').simulate('change', mockEvent)

    expect(wrapper.state()).toEqual(expectedState)
  })
})