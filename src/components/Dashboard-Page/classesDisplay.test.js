import React from 'react';
import {shallow} from 'enzyme';
import {ClassesDisplay} from './classesDisplay';

describe('<ClassesDisplay/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ClassesDisplay dispatch={()=>{}} classes={[]}/>);
  });
});