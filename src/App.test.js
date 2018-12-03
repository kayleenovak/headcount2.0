import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import CardContainer from './CardContainer';
import Search from './Search.js'
import DistrictRepository from './helper.js';
import kinderData from './data/kindergartners_in_full_day_program.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
});

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders a heading and Card Container', () => {
    const wrapper = shallow(<App />);
    const container = <CardContainer />;
    const heading = <h1 className='app-name'>Headcount</h1>;

    expect(wrapper.contains(container && heading)).toBe(true)
  });

  it('should update state after populateSchools runs', () => {
    const wrapper = shallow(<App />)
    const string = 'colorado springs 11'
    const expectedState = {
      'data': new DistrictRepository(kinderData),
      'schools': ['COLORADO SPRINGS 11'],
      'filteredSchools': {
        "COLORADO SPRINGS 11": {
          "location": "COLORADO SPRINGS 11",
          "stats": {
            "2004": 0.069,
            "2005": 0.509,
            "2006": 0.638,
            "2007": 0.994,
            "2008": 0.992,
            "2009": 1,
            "2010": 0.993,
            "2011": 0.994,
            "2012": 0.993,
            "2013": 0.989,
            "2014": 0.994,
          },
        },
      },
      'schoolsForComparison': [],
      'comparedSchools': {},
      'comparison': {}
    }

    wrapper.instance().populateSchools(string)
    expect(wrapper.state()).toEqual(expectedState)
  })

  it('setComparedSchools should update state and call compareSchools', () => {
    const wrapper = shallow(<App />)
    const expectedSchools = ['COLORADO', 'COLORADO SPRINGS 11']
    const expectedCompSchools = {
      "COLORADO": {
        "stats": {
          "2004": 0.24,
          "2005": 0.278,
          "2006": 0.337,
          "2007": 0.395,
          "2008": 0.536,
          "2009": 0.598,
          "2010": 0.64,
          "2011": 0.672,
          "2012": 0.695,
          "2013": 0.703,
          "2014": 0.741,
        },
      },
      "COLORADO SPRINGS 11": {
        "stats": {
          "2004": 0.069,
          "2005": 0.509,
          "2006": 0.638,
          "2007": 0.994,
          "2008": 0.992,
          "2009": 1,
          "2010": 0.993,
          "2011": 0.994,
          "2012": 0.993,
          "2013": 0.989,
          "2014": 0.994,
        },
      },
    }
    const mockTarget = {
      target: {
        id: 'COLORADO'
      }
    }
    const secondMock = {
      target: {
        id: 'COLORADO SPRINGS 11'
      }
    } 
    const spy = spyOn(wrapper.instance(), 'compareSchools')
    wrapper.instance().forceUpdate()

    wrapper.instance().setComparedSchools(mockTarget)
    wrapper.instance().setComparedSchools(secondMock)
    expect(spy).toBeCalled()
    expect(wrapper.state().schoolsForComparison).toEqual(expectedSchools)
    expect(wrapper.state().comparedSchools).toEqual(expectedCompSchools)
  })

  it('should update state when compareSchools is called', () => {
    const wrapper = shallow(<App />)
    const expectedState = {
      "COLORADO": 0.53,
      "COLORADO SPRINGS 11": 0.833,
      "compared": 0.636
    }

    wrapper.state().schoolsForComparison = ['COLORADO', 'COLORADO SPRINGS 11']
    wrapper.instance().compareSchools()
    expect(wrapper.state().comparison).toEqual(expectedState)
  })

  it('should update state when removeComparedSchool is called', () => {
    const wrapper = shallow(<App />)
    const mockTarget = {
      target: {
        id: 'COLORADO'
      }
    }
    const expectedSchools = ['COLORADO SPRINGS 11']
    const expectedComparison = {
      "COLORADO SPRINGS 11": {
        "location": "COLORADO SPRINGS 11",
        "stats": {
          "2004": 0.069,
          "2005": 0.509,
          "2006": 0.638,
          "2007": 0.994,
          "2008": 0.992,
          "2009": 1,
          "2010": 0.993,
          "2011": 0.994,
          "2012": 0.993,
          "2013": 0.989,
          "2014": 0.994,
        },
      },
    }
    wrapper.state().schoolsForComparison = ['COLORADO', 'COLORADO SPRINGS 11']
    wrapper.instance().removeComparedSchool(mockTarget)

    expect(wrapper.state().schoolsForComparison).toEqual(expectedSchools)
    expect(wrapper.state().comparedSchools).toEqual(expectedComparison)
  })

})