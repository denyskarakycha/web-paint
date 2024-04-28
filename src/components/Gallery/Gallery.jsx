import "./Gallery.css";
import NavBar from "../NavBar/NavBar";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pictures from "./Pictures/Pictures";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import Pagination from "./Pagination/Pagination";

const Gallery = () => {
  const [cordinats, setCordinats] = useState([]);
  const [countUserImages, setCoutnUserImages] = useState(null);
  const [isUploadedImages, setIsUploadedImages] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImages, setCurrentImages] = useState(null);
  const imagesPerPage = 2;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(true);
  };

  const onCancel = () => {
    setImageTitle("");
    setShowPopup(false);
  };

  const onSaveImage = (event) => {
    event.preventDefault();
    localStorage.setItem("imageTitle", imageTitle);
    navigate("/canvas");
  };

  const hendleEditImage = (imageId) => {
    console.log(imageId);
    localStorage.setItem("imageId", imageId);
    navigate("/canvas");
  };

  const handleUploadedImages = (value) => {
    setIsUploadedImages(value);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const imagesCollectionRef = doc(db, "images", imageId);
      await deleteDoc(imagesCollectionRef);
      const usersDocRef = doc(db, "users", userId);
      const usersCredentials = await getDoc(usersDocRef);
      console.log(usersCredentials.data());
      let userImagesDataId = usersCredentials.data().images;
      console.log(imageId);
      userImagesDataId = userImagesDataId.filter((item) => item !== imageId);
      console.log(userImagesDataId);
      await updateDoc(usersDocRef, { images: userImagesDataId });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const uploadImages = async () => {
      try {
        const imagesCollectionRef = collection(db, "images");
        const imagesQuery = query(
          imagesCollectionRef,
          where("user_id", "==", userId)
        );

        const imageDocs = await getDocs(imagesQuery);
        const imagesCordinats = imageDocs.docs.map((item) => {
          return {
            id: item.id,
            title: item.data().title,
            cordinats: JSON.parse(item.data().cordinats),
          };
        });

        if (imagesCordinats.length === 0) {
          setIsUploadedImages(true);
        }

        const currentImages = imagesCordinats.slice(indexOfFirstImage, indexOfLastImage);

        setCoutnUserImages(imagesCordinats.length);
        setCordinats(imagesCordinats);
        setCurrentImages(currentImages);
        console.log(currentImages);
      } catch (error) {
        console.log(error);
      }
    };

    uploadImages();
  }, [userId]);

  const paginate = (pageNumber) => {
    setCurrentImages(cordinats.slice(indexOfFirstImage, indexOfLastImage));
    setCurrentPage(pageNumber)
  };

  return (
    <>
      <NavBar pathCanvas={"/canvas"} handlePopupAction={togglePopup}></NavBar>
      <div className="gallery-container">
        {countUserImages ? (
          currentImages.map((imageData, index) => {
            return (
              <Pictures
                key={index}
                cordinats={imageData.cordinats}
                canvasId={imageData.id}
                imageTitle={imageData.title}
                onUploadedImages={handleUploadedImages}
                onDeleteImageDoc={handleDeleteImage}
                onEditImage={hendleEditImage}
              ></Pictures>
            );
          })
        ) : isUploadedImages && (
          <h1 style={{ fontFamily: "cursive", color: "#FF69B4" }}>
            Draw a picture of your dreams ! 🎨🌈
            <br />
            <span
              style={{
                fontFamily: "cursive",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              Click on the: + Add new
            </span>
          </h1>
        )}
      </div>
      <Pagination
        imagesPerPage={imagesPerPage}
        totalImages={countUserImages}
        currentPage={currentPage}
        paginate={paginate}
      ></Pagination>
      {!isUploadedImages && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Popup show={showPopup}>
        <h2
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Want to create a new picture ? 😇
        </h2>
        <div style={{ padding: "10px" }}>
          <p>Enter image title</p>
          <input
            type="text"
            placeholder="Title image"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          ></input>
        </div>
        <div className="button-container">
          <Button type={"click"} onClick={onSaveImage}>
            Save
          </Button>
          <Button type={"click"} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Popup>
    </>
  );
};

export default Gallery;
