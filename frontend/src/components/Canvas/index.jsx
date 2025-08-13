import React, { useLayoutEffect, useRef, useState } from "react";
import {
  loadSprite,
  makeSprite,
  makeLayer,
  makeInfiniteScroll,
} from "../../lib/utils.js";

const Canvas = ({ children }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    new ResizeObserver((entries) => {
      setHeight(() => canvas.parentElement.clientHeight);
      // setWidth(() => entry.contentRect.width  );
      setWidth(() => canvas.parentElement.clientWidth);
    }).observe(canvas.parentElement);

    const ctx = canvas.getContext("2d");

    const main = async () => {
      try {
        const [layer1, layer2, layer3, layer4] = await Promise.all([
          loadSprite("/1.png"),
          loadSprite("/2.png"),
          loadSprite("/3.png"),
          loadSprite("/4.png"),
        ]).catch((e) => console.log("Error loading image: ", e));

        const layer1Obj = makeSprite(ctx, layer1, { x: 0, y: -200 }, 4);
        const layer2Obj = makeLayer(ctx, layer2, { x: 0, y: -200 }, 4);
        const layer3Obj = makeLayer(ctx, layer3, { x: 0, y: -300 }, 4);
        const layer4Obj = makeLayer(ctx, layer4, { x: 0, y: -300 }, 4);

        let dt;
        let oldTimeStamp = 0;

        const debugMode = false;
        let fps;

        const defaultSpeed = 150;
        let speed = defaultSpeed;

        const gameLoop = (timeStamp) => {
          dt = (timeStamp - oldTimeStamp) / 1000;
          oldTimeStamp = timeStamp;
          fps = Math.round(1 / dt);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = false;
          ctx.fillStyle = "#fff";

          layer1Obj.draw();
          makeInfiniteScroll(dt, layer2Obj, speed * dt * -110);
          makeInfiniteScroll(dt, layer3Obj, speed * dt * -190);
          makeInfiniteScroll(dt, layer4Obj, speed * dt * -450);

          if (debugMode) {
            ctx.font = "128px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(fps, 25, 120);
          }

          requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);

        // Listener for vertical scroll based on mouse position
        canvasRef.current.parentElement.addEventListener("mousemove", (e) => {
          layer2Obj.head.pos.y = e.screenY / 30 - 233;
          layer2Obj.tail.pos.y = e.screenY / 30 - 233;

          layer3Obj.head.pos.y = e.screenY / 50 - 312;
          layer3Obj.tail.pos.y = e.screenY / 50 - 312;

          layer4Obj.head.pos.y = e.screenY / -50 - 280;
          layer4Obj.tail.pos.y = e.screenY / -50 - 280;
        });
      } catch (error) {
        3;
        console.log("JOHN:::: ", error);
      }
    };

    main();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gameCanvas"
      width={width}
      height={height - 40}
      className={`top-10 absolute -z-10`}
      //   style={{ imageRendering: "pixelated" }}
    />
  );
  //   <Sprite path="./assets/1.png" />;
};

export default Canvas;
