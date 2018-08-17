import React from 'react';
import {shallow} from 'enzyme';
import {CreateAssignmentForm} from './createAssignmentForm';

describe('<CreateAssignmentForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CreateAssignmentForm dispatch={()=>{}} classes={[]} categories={[]}/>);
  });
});