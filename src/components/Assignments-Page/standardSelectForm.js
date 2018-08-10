import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {Field} from 'redux-form';
import Input from '../input';
import { fetchStates } from '../../actions/Assignment-Page-Actions/fetchStandards';

class StandardSelectForm extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStates());
  }
  render(){
    const states = this.props.states.map(state => <li>{state}</li>);
    return(
      <ul>
        {states}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    states: state.standardsReducer.states
  };
};

export default requiresLogin()(connect(mapStateToProps)(StandardSelectForm));


