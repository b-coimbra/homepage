import React, { useState } from 'react';

import './Profile.css';

import Api from '../../services/Api.js';

function Profile() {
  const [bio, setBio] = useState('');

  Api.data.then(data => {
    setBio(data.bio);
  });

  return (
    <div id="profile">
      <h1>About me</h1>
      <p>{ bio }</p>
    </div>
  );
}

export default Profile;
