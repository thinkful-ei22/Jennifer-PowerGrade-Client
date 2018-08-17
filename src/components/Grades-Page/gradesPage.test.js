import React from 'react';
import {shallow} from 'enzyme';
import {GradesPage} from './gradesPage';

describe('<GradesPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GradesPage dispatch={()=>{}}/>);
  });
});