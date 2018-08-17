import React from 'react';
import {shallow} from 'enzyme';
import {GradebookSetupForm} from './gradebookSetupForm';

describe('<GradebookSetupForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GradebookSetupForm dispatch={()=>{}} categories={[]}/>);
  });
});