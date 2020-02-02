import React from 'react';

import "./Loader.css";

function Loader(props) {
  return (
    <div className={ props.loaded ? 'loader loaded' : 'loader' }></div>
  );
}

export default Loader;
