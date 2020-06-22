import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import paths from '../../common/paths';

import './Menu.css';

function Menu() {
  const sections = useRef();
  const [addedEvents, setAddedEvents] = useState(false);

  const deactivateSections = () => {
    sections
      .current
      .childNodes
      .forEach(section => section.classList.remove('active'));
  };

  const activateSection = (section) =>
        section.classList.add('active');

  const addSectionEvents = () => {
    if (addedEvents) return;

    let { childNodes: nodes } = sections.current;

    const isFixed = ({ classList: node }) => node.contains('fixed');

    for (let node of nodes) {
      if (isFixed(node))
        continue;

      node.onclick = ({ target: section }) => {
        deactivateSections();
        activateSection(section);
      };
    }

    setAddedEvents(true);
  };

  useEffect(() => addSectionEvents());

  return (
    <div id="menu">
      <div ref={sections} className="sections">
        {
          paths.map((path, i) => {
            const isActive = (node) => 'active' in node ? ' active' : '';

            return <Link to={path.location}
                         name={path.name}
                         className={"section " + path.name + isActive(path)}
                         key={i} />;
          })
        }
        <a href="https://github.com/0-l/"
           target="_blank"
           rel="noopener noreferrer"
           className="section fixed">
          <p style={{ display: 'none' }}></p>
        </a>
        <div className="mark"></div>
      </div>
    </div>
  );
}

export default Menu;
