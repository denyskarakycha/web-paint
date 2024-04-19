import "./Gallery.css";
import NavBar from "../NavBar/NavBar";
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
import { useEffect, useState } from "react";

const Gallery = () => {
  const [cordinats, setCordinats] = useState([]);
  const [imagesDocs, setImagesDocs] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    let selectedColor = "#000";

    window.addEventListener("load", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
    });

    const setCanvasBackground = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor;
    };

    const uploadImages = async () => {
      try {
        const imagesCollectionRef = collection(db, "images");
        const imagesQuery = query(
          imagesCollectionRef,
          where("user_id", "==", userId)
        );

        const imageDocs = await getDocs(imagesQuery);
        const [imagesCordinats] = imageDocs.docs.map((item) =>
          JSON.parse(item.data().cordinats)
        );

        for (let i = 0; i < imagesCordinats.length - 1; i++) {
          const start = imagesCordinats[i];
          const end = imagesCordinats[i + 1];

          if ((!end.x && !end.y) || (!start.x && !start.y)) continue;

          const scaledStartX = start.x * (canvas.width / 1250);
          const scaledStartY = start.y * (canvas.height / 550);
          const scaledEndX = end.x * (canvas.width / 1250);
          const scaledEndY = end.y * (canvas.height / 550);

          ctx.lineWidth = start.brushWidth
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.moveTo(scaledStartX, scaledStartY);
          ctx.lineTo(scaledEndX, scaledEndY);
          ctx.strokeStyle = start.color;
          ctx.stroke();
        }
      } catch (e) {
        console.log(e);
      }
    };

    uploadImages();

    return () => {};
  }, [cordinats, imagesDocs, userId]);

  return (
    <>
      <NavBar></NavBar>
      <div className="gallery-container">
        <div className="block">
          <label className="content">title 1</label>
          <canvas className="canvas"></canvas>
          <div className="button-container">
            <button>delete</button>
          </div>
        </div>
        <div className="block">
          <label className="content">title 2</label>
          <canvas className="canvas"></canvas>
          <div className="button-container">
            <button>delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
