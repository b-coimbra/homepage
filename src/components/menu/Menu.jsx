import React, { useRef, useEffect } from 'react';

import {
  Link
} from 'react-router-dom';

import './Menu.css';

function Menu() {
  const sections = useRef();

  const deactivateSections = () => {
    sections
      .current
      .childNodes
      .forEach(section => section.classList.remove('active'));
  };

  const activateSection = (section) =>
        section.classList.add('active');

  const addSectionEvents = () => {
    let { childNodes: nodes } = sections.current;

    for (let node of nodes) {
      node.onclick = ({ target: section }) => {
        deactivateSections();
        activateSection(section);
      };
    }
  };

  useEffect(() => addSectionEvents(), []);

  // TODO: <Link/> to corresponding components *onclick*
  return (
    <div id="menu">
      <div ref={sections} className="sections">
        <Link to="/profile" className="section profile active"/>
        <Link to="/projects" className="section projects"/>
        <div className="section dotfiles"></div>
        <div className="section github"></div>
        <div className="mark"></div>
      </div>
    </div>
  );
}

export default Menu;
