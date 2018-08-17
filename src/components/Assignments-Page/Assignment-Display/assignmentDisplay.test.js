import React from 'react';
import {shallow} from 'enzyme';
import {AssignmentDisplay} from './assignmentDisplay';

describe('<AssignmentDisplay/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AssignmentDisplay assignments={[]} dispatch={()=>{}}/>);
  });
});