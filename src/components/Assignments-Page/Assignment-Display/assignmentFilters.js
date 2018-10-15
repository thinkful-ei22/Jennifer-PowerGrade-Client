import React from 'react';
import {connect} from 'react-redux';
import ClassDropdown from './classDropdown';
import {searchAssignmentFilter} from '../../../actions/GET/fetchAssignments';
import '../../componentStyles.css';
import '../../componentTabletStyles.css';
import '../../componentMobileStyles.css';
import { fetchStates } from '../../../actions/GET/fetchStandards';
import requiresLogin from '../../requiresLogin';


export class AssignmentFilters extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStates());
  }
  render(){
    return (
      <div className="assignment-filters">
        <label className="assignment-filters-label" htmlFor="search">Search</label>
        <input
          className="assignment-search-filter"
          onChange={(e) => this.props.dispatch(searchAssignmentFilter(e.target.value))}
          type="search"
          name="search"
          id="search">
        </input>
        <ClassDropdown/>
      </div>
    );
  }
}



export default requiresLogin()(connect()(AssignmentFilters));