import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from './landingPage';

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LoginPage dispatch={()=>{}}/>);
  });
});