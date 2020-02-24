import React, { useRef, useState, useEffect } from 'react';

import {
  Router,
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

  const effects = {
    expanded: 'expanded',
    hidden: 'hidden',
    fullscreen: 'fullscreen',
    retracted: 'retract'
  };

  const fitContainerSize = () => selector.current.classList.add(effects.expanded);
  const showDots = () => dots.current.classList.remove(effects.hidden);

  useEffect(() => {
    const isFullscreen = () => ['/projects'].includes(history.location.pathname);

    const goFullscreen = (isFull) => {
      const { parentNode: card } = selector.current;

      if (!isFull)
        card.classList.remove(effects.fullscreen);
      else
        card.classList.add(effects.fullscreen);
    };

    goFullscreen(isFullscreen());
  }, [history.location.pathname, effects]);

  const retractContainerSize = () => {
    let { classList: selectorClass } = selector.current;

    selectorClass.add(effects.retracted);

    setTimeout(() => {
      selectorClass.remove(effects.expanded);
      selectorClass.remove(effects.retracted);

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
    retractContainerSize();
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
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/projects" component={Projects}></Route>
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
