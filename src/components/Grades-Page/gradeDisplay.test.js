import React from 'react';
import {shallow} from 'enzyme';
import jest from 'jest';
import {GradeDisplay} from './gradeDisplay';

describe('<GradeDisplay/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GradeDisplay 
      filteredClasses={[]}
      grades={[]}
      dispatch={()=>{}}/>);
  });
});