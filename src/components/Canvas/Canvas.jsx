import NavBar from "../NavBar/NavBar";
import "./Canvas.css";
import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config";

const Canvas = () => {

  useEffect(() => {
    const canvas = document.querySelector("canvas"),
      toolBtns = document.querySelectorAll(".tool"),
      fillColor = document.querySelector("#fill-color"),
      sizeSlider = document.querySelector("#size-slider"),
      colorBtns = document.querySelectorAll(".colors .option"),
      colorPicker = document.querySelector("#color-picker"),
      clearCanvas = document.querySelector(".clear-canvas"),
      saveImg = document.querySelector(".save-img"),
      ctx = canvas.getContext("2d");
    let prevMouseX,
      prevMouseY,
      snapshot,
      isDrawing = false,
      selectedTool = "brush",
      brushWidth = 5,
      selectedColor = "#000";
    const setCanvasBackground = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor; 
    };
    window.addEventListener("load", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
    });
    const drawRect = (e) => {
      if (!fillColor.checked) {
        return ctx.strokeRect(
          e.offsetX,
          e.offsetY,
          prevMouseX - e.offsetX,
          prevMouseY - e.offsetY
        );
      }
      ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      );
    };


    const startDraw = (e) => {
      isDrawing = true;
      prevMouseX = e.offsetX; 
      prevMouseY = e.offsetY; 
      ctx.beginPath(); 
      ctx.lineWidth = brushWidth; 
      ctx.strokeStyle = selectedColor; 
      ctx.fillStyle = selectedColor; 
 
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const drawing = (e) => {
      if (!isDrawing) return; 
      ctx.putImageData(snapshot, 0, 0); 
      if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        // add save data
        ctx.lineTo(e.offsetX, e.offsetY); 
        ctx.stroke(); 
      } else if (selectedTool === "rectangle") {
        drawRect(e);
      }
    };
    toolBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
      });
    });
    sizeSlider.addEventListener(
      "change",
      () => (brushWidth = sizeSlider.value)
    ); 
    colorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".options .selected")
          .classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window
          .getComputedStyle(btn)
          .getPropertyValue("background-color");
      });
    });

    colorPicker.addEventListener("change", () => {
      colorPicker.parentElement.style.background = colorPicker.value;
      colorPicker.parentElement.click();
    });

    clearCanvas.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      setCanvasBackground();
    });

    saveImg.addEventListener("click", async () => {
      await addDoc(collection(db, 'images'), { cordinats: '123', user_id: '123'});
    });

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => (isDrawing = false));

    return () => {
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", drawing);
      canvas.addEventListener("mouseup", () => (isDrawing = false));
    };
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="canvas-body">
        <div className="canvas-container">
          <section className="tools-board">
            <div className="row">
              <label className="title">Options</label>
              <ul className="options">
                <li className="option active tool" id="brush">
                  <img src="icons/brush.svg" alt="" />
                  <i className="fi fi-rs-paint-brush"></i>
                  <span>Brush</span>
                </li>
                <li className="option tool" id="eraser">
                  <img src="icons/eraser.svg" alt="" />
                  <i className="fi fi-ts-eraser"></i>
                  <span>Eraser</span>
                </li>
                <li className="option">
                  <input
                    type="range"
                    id="size-slider"
                    min="1"
                    max="30"
                    defaultValue='5'
                  />
                </li>
              </ul>
            </div>
            <div className="row colors">
              <label className="title">Colors</label>
              <ul className="options">
                <li className="option"></li>
                <li className="option selected"></li>
                <li className="option"></li>
                <li className="option"></li>
                <li className="option">
                  <input type="color" id="color-picker" defaultValue="#4A98F7" />
                </li>
              </ul>
            </div>
            <div className="row buttons">
              <button className="clear-canvas">Clear</button>
              <button className="save-img">Save</button>
            </div>
          </section>
          <section className="drawing-board">
            <canvas id="canvas"></canvas>
          </section>
        </div>
      </div>
    </>
  );
};

export default Canvas;
