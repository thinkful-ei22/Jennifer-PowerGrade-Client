import React from 'react';
import {shallow} from 'enzyme';
import {AssignmentFilters} from './assignmentFilters';

describe('<AssignmentFilters/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AssignmentFilters dispatch={()=>{}}/>);
  });
});