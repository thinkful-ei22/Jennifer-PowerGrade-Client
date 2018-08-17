import React from 'react';
import {shallow} from 'enzyme';
import {EditClassForm} from './editClassForm';

describe('<EditClassForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<EditClassForm dispatch={()=>{}} students={[]} currentClass={{}}/>);
  });
});