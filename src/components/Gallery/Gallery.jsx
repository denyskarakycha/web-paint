import "./Gallery.css";
import NavBar from "../NavBar/NavBar";

const Gallery = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <div className="block">
          <div className="images-container">
            <div className="canvas">
              <img src="icon2.png" alt="Icon 1"/>
              <a href=""></a>
            </div>
            <div className="canvas">
              <img src="icon3.png" alt="Icon 2" />
            </div>
            <div className="canvas">
              <img src="icon1.png" alt="Icon 3" />
            </div>
            <div className="canvas">
              <img src="icon2.png" alt="Icon 4" />
            </div>
            <div className="canvas">
              <img src="icon3.png" alt="Icon 5" />
            </div>
            <div className="canvas">
              <img src="icon3.png" alt="Icon 6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
