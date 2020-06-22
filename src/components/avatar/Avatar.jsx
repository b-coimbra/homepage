import React, { useState } from 'react';

import './Avatar.css';
import Api from '../../services/Api.js';
import DefaultAvatar from '../../assets/avatar.jpg';

function Avatar () {
  const [avatar, setAvatar] = useState('');
  const [followers, setFollowers] = useState(0);

  Api.data.then(data => {
    setAvatar(data.avatar_url);
    setFollowers(data.followers);
  });

  return (
    <div className="avatar">
      <div className="followers">
        <p><span>{ followers }</span> followers</p>
      </div>
      <img alt="" src={ avatar || DefaultAvatar }/>
    </div>
  );
}

export default Avatar;
