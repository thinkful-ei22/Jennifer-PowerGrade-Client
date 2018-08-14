import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';

class GettingStarted extends React.Component {
  render(){
    return (
      <div>
        <h1>Image Carousel</h1>
        <div class="hero">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat1.jpg" alt="An orange-eyed grey cat stretches toward the camera."/>
        </div>
        <div class="thumbnails">
          <a data-src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat1.jpg" class="thumbnail" href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat1.jpg" alt="An orange-eyed grey cat stretches toward the camera."/></a>
          <a class="thumbnail" href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat2.jpg" alt="Closeup of a blue-eyed, grey cat with markings."/></a>
          <a class="thumbnail" href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat3.jpg" alt="An orange cat licks its paw."/></a>
          <a class="thumbnail" href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-65/cat4.jpg" alt="A content brown cat lounges with eyes closed."/></a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
  
export default requiresLogin()(connect(mapStateToProps)(GettingStarted));