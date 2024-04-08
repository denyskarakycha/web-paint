import NavBar from "../NavBar/NavBar";
import "./Canvas.css";

const Canvas = () => {
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
                    value="5"
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
                  <input type="color" id="color-picker" value="#4A98F7" />
                </li>
              </ul>
            </div>
            <div className="row buttons">
              <button className="clear-canvas">Clear</button>
              <button className="save-img">Save</button>
            </div>
          </section>
          <section className="drawing-board">
            <canvas></canvas>
          </section>
        </div>
      </div>
    </>
  );
};

export default Canvas;
