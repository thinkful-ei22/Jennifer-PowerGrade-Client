import React from 'react';
import {shallow} from 'enzyme';
import {AssignmentsPage} from './assignmentsPage';

describe('<AssignmentsPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AssignmentsPage dispatch={()=>{}} assignments={[]}/>);
  });
});