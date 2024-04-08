import NavBar from "../NavBar/NavBar";
import "./Picture.css";

const Picture = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="picture-container">
        <div className="square">
          <p>hello</p>
        </div>
        <div className="buttons">
          <button>Save</button>
          <button>Share</button>
        </div>
      </div>
    </>
  );
};

export default Picture;
