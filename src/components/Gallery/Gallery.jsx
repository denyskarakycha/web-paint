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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pictures from "./Pictures/Pictures";

const Gallery = () => {
  const [cordinats, setCordinats] = useState([]);
  const [countUserImages, setCoutnUserImages] = useState(null);
  const [isUploadedImages, setIsUploadedImages] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleUploadedImages = (value) => {
    setIsUploadedImages(value);
  };

  useEffect(() => {
    console.log(1);
    const uploadImages = async () => {
      try {
        const imagesCollectionRef = collection(db, "images");
        const imagesQuery = query(
          imagesCollectionRef,
          where("user_id", "==", userId)
        );

        const imageDocs = await getDocs(imagesQuery);
        const imagesCordinats = imageDocs.docs.map((item) =>
          JSON.parse(item.data().cordinats)
        );

        if (imagesCordinats.length === 0) {
          setIsUploadedImages(true);
        }

        setCoutnUserImages(imagesCordinats.length);
        setCordinats(imagesCordinats);
      } catch (error) {
        console.log(error);
      }
    };

    uploadImages();
  }, [userId]);

  return (
    <>
      <NavBar></NavBar>
      <div className="gallery-container">
        {countUserImages ? (
          cordinats.map((image, index) => {
            return (
              <Pictures
                key={index}
                cordinats={image}
                canvasId={index}
                onUploadedImages={handleUploadedImages}
              ></Pictures>
            );
          })
        ) : (
          <p>Not doc</p>
        )}
      </div>
      {!isUploadedImages && (
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

export default Gallery;
