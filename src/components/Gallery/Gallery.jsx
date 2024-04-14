import "./Gallery.css";
import NavBar from "../NavBar/NavBar";

const Gallery = () => {
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
