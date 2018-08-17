import React from 'react';
import {shallow} from 'enzyme';
import {GettingStarted} from './gettingStarted';

describe('<GettingStarted/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GettingStarted dispatch={()=>{}}/>);
  });
});