import React from 'react';
import {shallow} from 'enzyme';
import {CreateClassForm} from './createClassForm';

describe('<CreateClassForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CreateClassForm dispatch={()=>{}} students={[]}/>);
  });
});