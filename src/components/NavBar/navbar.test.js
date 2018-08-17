import React from 'react';
import {shallow} from 'enzyme';
import {NavBar} from './navbar';

describe('<NavBar/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<NavBar dispatch={()=>{}}/>);
  });
});