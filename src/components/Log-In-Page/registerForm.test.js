import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationForm} from './registerForm';

describe('<RegistrationForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<RegistrationForm dispatch={()=>{}} handleSubmit={()=>{}}/>);
  });
});