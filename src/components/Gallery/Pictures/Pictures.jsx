/* eslint-disable react/prop-types */
import "../Gallery.css";
import { useEffect } from "react";

const Pictures = (props) => {
  const {
    cordinats,
    canvasId,
    imageTitle,
    onUploadedImages,
    onDeleteImageDoc,
    onEditImage,
  } = props;

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    let selectedColor = "#000";

    const setCanvasBackground = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor;
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();

    const drawImages = async () => {
      try {
        for (let i = 0; i < cordinats.length - 1; i++) {
          const start = cordinats[i];
          const end = cordinats[i + 1];

          if ((!end.x && !end.y) || (!start.x && !start.y)) continue;

          const scaledStartX = start.x * (canvas.width / 1250);
          const scaledStartY = start.y * (canvas.height / 550);
          const scaledEndX = end.x * (canvas.width / 1250);
          const scaledEndY = end.y * (canvas.height / 550);

          ctx.lineWidth = start.brushWidth * (canvas.width / 1250);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.moveTo(scaledStartX, scaledStartY);
          ctx.lineTo(scaledEndX, scaledEndY);
          ctx.strokeStyle = start.color;
          ctx.stroke();
        }

        onUploadedImages(true);
      } catch (e) {
        console.log(e);
      }
    };

    if (cordinats.length > 0) {
      drawImages();
    }

    return () => {};
  }, [canvasId, cordinats, onUploadedImages]);

  return (
    <>
      <div className="block">
        <label className="content">{imageTitle}</label>
        <canvas className="canvas" id={canvasId}></canvas>
        <div className="button-container-canvas">
          <button onClick={() => onDeleteImageDoc(canvasId)}>delete</button>
          <button onClick={() => onEditImage(canvasId)} style={{float: "right", marginLeft: '20px'}}>edit</button>
        </div>
      </div>
    </>
  );
};

export default Pictures;
