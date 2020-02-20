import React, { useState } from 'react';

import './Avatar.css';
import Api from '../../../services/Api/Api.js';

function Avatar () {
  const [avatar, setAvatar] = useState('');

  Api.data.then(data => {
    setAvatar(data.avatar_url);
  });

  return (
    <div className="avatar">
      <img alt="" src={ avatar }/>
    </div>
  );
}

export default Avatar;
