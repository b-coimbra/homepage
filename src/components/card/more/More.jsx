import React, { useRef, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import './More.css';

import Menu from '../../menu/Menu.jsx';
import Profile from '../../sections/profile/Profile.jsx';
import Projects from '../../sections/projects/Projects.jsx';

function More() {
  const selector = useRef();
  const dots = useRef();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const fitContainerSize = () => selector.current.classList.add('expanded');
  const showDots = () => dots.current.classList.remove('hidden');

  function retractContainerSize() {
    let { classList: selectorClass } = selector.current;

    selectorClass.add('retract');

    setTimeout(() => {
      selectorClass.remove('expanded');
      selectorClass.remove('retract');

      showDots();
    }, 500);
  };

  const expand = () => {
    if (isOpen) return;

    fitContainerSize();
    setIsOpen(true);

    history.push('/profile');
  };

  const retract = () => {
    retractContainerSize(false);
    setIsOpen(false);

    history.push('/');
  };

  return (
    <div className="more"
         ref={selector}
         onClick={expand}>
      <div className="dots"
           ref={dots}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="more-info">
        <div className="paginator">
          <Router history={history}>
            <div onClick={retract} className="go-back"></div>
          <div className="content">
            <Switch>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/projects" component={Projects}></Route>
            </Switch>
          </div>
          <Menu/>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default More;
