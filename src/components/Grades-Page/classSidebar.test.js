import React from 'react';
import {shallow} from 'enzyme';
import {SideBar} from './classSidebar';

describe('<SideBar/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SideBar dispatch={()=>{}} classes={[]}/>);
  });
});