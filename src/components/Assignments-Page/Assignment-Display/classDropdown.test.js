import React from 'react';
import {shallow} from 'enzyme';
import {ClassDropdown} from './classDropdown';

describe('<ClassDropdown/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ClassDropdown dispatch={()=>{}} classes={[]}/>);
  });
});