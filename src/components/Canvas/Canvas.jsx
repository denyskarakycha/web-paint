/* eslint-disable no-unused-vars */
import NavBar from "../NavBar/NavBar";
import "./Canvas.css";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Canvas = () => {
  const naigate = useNavigate();
  const [state, setState] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const toolBtns = document.querySelectorAll(".tool");
    const sizeSlider = document.querySelector("#size-slider");
    const colorBtns = document.querySelectorAll(".colors .option");
    const colorPicker = document.querySelector("#color-picker");
    const clearCanvas = document.querySelector(".clear-canvas");
    const saveImg = document.querySelector(".save-img");
    const ctx = canvas.getContext("2d");
    let prevMouseX;
    let prevMouseY;
    let snapshot;
    let isDrawing = false;
    let selectedTool = "brush";
    let brushWidth = 5;
    let selectedColor = "#000";

    const cordinats = [];

    const setCanvasBackground = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor;
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();

    const stopDrawing = () => {
      isDrawing = false;
      cordinats.push({ x: null, y: null, color: null });
    };

    const startDraw = (e) => {
      isDrawing = true;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
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
        cordinats.push({
          x: e.offsetX,
          y: e.offsetY,
          color: selectedColor,
          brushWidth: ctx.lineWidth,
        });
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
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
      const userId = localStorage.getItem("userId");
      const imageTitle = localStorage.getItem("imageTitle");

      try {
        setState(true);
        const imageRef = await addDoc(collection(db, "images"), {
          title: imageTitle,
          cordinats: JSON.stringify(cordinats),
          user_id: userId,
        });

        localStorage.removeItem("imageTitle");

        const imageDoc = await getDoc(imageRef);
        const usersDocRef = doc(db, "users", userId);
        const usersCredentials = await getDoc(usersDocRef);
        let userImagesDataId = usersCredentials.data().images;
        userImagesDataId.push(imageDoc.id);
        await updateDoc(usersDocRef, { images: userImagesDataId });
        setState(false);
        naigate("/gallery");
      } catch (error) {
        console.log(error);
      }
    });

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", drawing);
      canvas.addEventListener("mouseup", stopDrawing);
    };
  }, []);

  return (
    <>
      <NavBar pathGallery={"/gallery"}></NavBar>
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
              </ul>
              <label className="title">Brush Width</label>
              <ul className="options">
                <li className="option">
                  <input
                    type="range"
                    id="size-slider"
                    min="1"
                    max="30"
                    defaultValue="5"
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
                  <input
                    type="color"
                    id="color-picker"
                    defaultValue="#4A98F7"
                  />
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
      {state && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Canvas;
