import React from 'react';

import './Projects.css';

// TODO: add sorting options and a search bar (for some reason)
// TODO: show project's name, description, stars and forks, (maybe lines of code and/or number of files), maybe an "expand" button to show the README page

function Profile() {
  const projects = [
	{
	  stats: {
		stars: 94,
		forks: 41,
		date: new Date()
	  },
	  info: {
		title: 'dawn',
		description: 'a startpage called dawn'
	  }
    }
  ];

  return (
	<>
	  <div className="timeline">
        <ul className="projects-list">
          <li className="project">
            <div className="stats">
              <div className="stat stars">
                <img src="" />
                <p className="count">94</p>
              </div>

			  <div className="stat forks">
                <img src="" />
                <p className="count">41</p>
              </div>

			  <div className="stat date">
                <img src="" />
                <p className="count">03-05</p>
              </div>
            </div>

			<div className="info">
			  <h1 className="title">megumacs</h1>
			  <p className="description">Doom-like emacs config</p>

              <div className="extra-info">
              </div>
			</div>
          </li>
        </ul>
	  </div>
	</>
  );
}

export default Profile;
