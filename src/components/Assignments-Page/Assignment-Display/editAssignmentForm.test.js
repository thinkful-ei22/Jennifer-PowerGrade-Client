import React from 'react';
import {shallow} from 'enzyme';
import {EditAssignmentForm} from './editAssignmentForm';

describe('<EditAssignmentForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<EditAssignmentForm dispatch={()=>{}} currentAssignment={{}} assignments={[]} categories={[]} classes={[]}/>);
  });
});