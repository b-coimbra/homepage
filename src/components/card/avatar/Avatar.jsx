import React from 'react';
import './Avatar.css';

import avatar from '../../../assets/avatar.jpg';

function Avatar () {
  return (
    <div className="avatar">
      <img alt="" src={ avatar }/>
    </div>
  );
}

export default Avatar;
