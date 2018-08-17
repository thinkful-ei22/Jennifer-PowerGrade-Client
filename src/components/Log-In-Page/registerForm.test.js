import React from 'react';
import {shallow} from 'enzyme';
import {RegisterForm} from './landingPage';

describe('<RegisterForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<RegisterForm dispatch={()=>{}}/>);
  });
});