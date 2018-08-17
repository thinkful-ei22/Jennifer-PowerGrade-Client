import React from 'react';
import {shallow} from 'enzyme';
import {LogoutAlert} from './logoutAlert';

describe('<LogoutAlert/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LogoutAlert dispatch={()=>{}}/>);
  });
});