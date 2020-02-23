import React, { useState, useEffect } from 'react';

import './Card.css';

import More   from './more/More.jsx';
import Avatar from './avatar/Avatar.jsx';
import Loader from '../loader/Loader.jsx';
import Api    from '../../services/Api/Api.js';

function Card() {
  const [fullname, setFullname] = useState('');
  const [surname, setSurname] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  Api.data.then(data => {
    setFullname(data.name);
    setSurname(data.surname);

    setIsLoading(false);
  });

  // const setFullname = ({ name: fullname }) => {
    // const [name, ...surname] = fullname.split(" ");
  //   setName(name);
  //   setSurname(surname);
  // };

  useEffect(() => {
    setIsLoading(true);
  }, [fullname, surname]);

  return (
    <>
      <Loader loaded={isLoading}/>
      <div id="card">
        <Avatar/>
        <div className="info">
          <h1 className="fullname">
            <span>{ fullname }</span>
            <span className="surname"> { surname }</span>
          </h1>
          <h2 className="role">Developer</h2>
        </div>
        <More/>
      </div>
    </>
  );
}

export default Card;
