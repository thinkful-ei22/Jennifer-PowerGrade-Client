import React from 'react';
import {App} from './App';
import {shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const wrapper = shallow(<BrowserRouter><App/></BrowserRouter>);
});
