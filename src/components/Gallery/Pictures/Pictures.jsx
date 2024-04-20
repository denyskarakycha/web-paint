/* eslint-disable react/prop-types */
import "../Gallery.css";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Pictures = (props) => {
  const { cordinats, canvasId, onUploadedImages } = props;

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    console.log(1);
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
        <label className="content">title 1</label>
        <canvas className="canvas" id={canvasId}></canvas>
        <div className="button-container">
          <button>delete</button>
        </div>
      </div>
    </>
  );
};

export default Pictures;
