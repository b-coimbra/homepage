import React, { useRef, useEffect } from 'react';

function Background() {
  let canvas = useRef();

  const autoresize = () => {
    window.onresize = () => {
      setCanvasSize();
      draw();
    };
  };

  const draw = () => {
    const ctx = canvas.current.getContext('2d');

    const Circle = ({
      x, y,
      radius,
      sAngle = 0,
      eAngle = Math.PI * 2,
      clockwise = false,
      fillStyle = 'black'
    }) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, sAngle, eAngle, clockwise);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

    const spacing = 30;
    const size = {
      x: Math.round(window.innerWidth / spacing),
      y: Math.round(window.innerHeight / spacing)
    };

    let dim = 0.1,
        radius = 1,
        alpha = 1,
        padding = 10;

    let circles = [];
    let enlargedPoints = [];

    for (let x = 0; x <= size.x; x++) {
      if (x >= (size.x / 2))
        alpha *= -1;

      dim += (alpha / size.x);

      for (let y = 0; y <= size.y; y++) {
        let coordinates = {
          x: (x * spacing) + radius + padding,
          y: (y * spacing) + radius + padding 
        };

        Circle({
          ...coordinates,
          radius,
          fillStyle: rgba(0, 0, 0, dim.toFixed(2))
        });

        circles.push({ ...coordinates });
      }
    }

    const inRange = (num, range, pad = 0) =>
          (range <= num && range >= num - pad);

    const pinpoint = (x, y) =>
          circles.filter(circle => (inRange(x, circle.x, padding * 2)) && (inRange(y, circle.y, padding * 2)))[0];

    const enlarge = (location, radius = 1) => {
      let velocity  = 20,
          maxRadius = 30,
          minRadius = 1,
          scaleBy   = 1,
          fillStyle = '#47485a';

      let timer = setInterval(() => {
        if (radius >= maxRadius / 2)
          scaleBy *= -1;

        radius += scaleBy;

        if (radius >= maxRadius || radius <= minRadius)
          clearInterval(timer);

        ctx.clearRect(location.x - Math.round(maxRadius / 2),
                      location.y - Math.round(maxRadius / 2),
                      maxRadius, maxRadius);

        Circle({ ...location, radius, fillStyle });
      }, velocity);

      enlargedPoints.pop();
    };

    const hasEnlarged = (point) => {
      if (enlargedPoints.length === 0)
        return false;

      return enlargedPoints.find(e => point.x === e.x && point.y === e.y);
    };

    canvas.current.onmousemove = ({ x, y }) => {
      const location = pinpoint(x, y);

      if (typeof location != 'undefined' && !hasEnlarged(location)) {
        enlarge(location);
        enlargedPoints.push(location);
      }
    };
  };

  const setCanvasSize = () => {
    const { innerWidth, innerHeight } = window;
    canvas.current.width = innerWidth;
    canvas.current.height = innerHeight;
  };

  useEffect(() => {
    const setup = () => {
      setCanvasSize();
      autoresize();
      draw();
    };

    setup();
  }, [canvas]);

  return (
    <canvas id="background" ref={canvas} />
  );
}

export default Background;
