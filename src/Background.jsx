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
      clockwise = false
    }) => ctx.arc(x, y, radius, sAngle, eAngle, clockwise);

    const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

    const spacing = 30;
    const size = {
      x: Math.round(window.innerWidth / spacing),
      y: Math.round(window.innerHeight / spacing)
    };

    let dim = 0.1,
        radius = 1,
        padding = 3;

    for (let x = 0; x <= size.x; x++) {
      if (x >= (size.x / 2))
        dim -= (1 / size.x);
      else
        dim += (1 / size.x);

      for (let y = 0; y <= size.y; y++) {
        ctx.beginPath();

        let coordinates = {
          x: (x * spacing) + radius + padding,
          y: (y * spacing) + radius + padding 
        };

        Circle({ ...coordinates, radius });

        ctx.fillStyle = rgba(0, 0, 0, dim.toFixed(2));
        ctx.fill();
      }
    }
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
