import "./NavBar.css";
import { useNavigate } from "react-router";

const NavBar = ({pathGallery, pathCanvas, handlePopupAction}) => {
  const navigate = useNavigate();

  const handleGalleryTransition = () => {
    navigate(!pathGallery ? '' : pathGallery);
  }

  const handleAddNewTransition = () => {
    navigate(!pathCanvas ? '' : pathCanvas);
  }

  return (
      <header className="header">
        <a href="#" className="logo">
          Web Paint 🎨
        </a>
        <nav className="navbar">
          <a onClick={handleGalleryTransition}>Gallery</a>
          <a onClick={!handlePopupAction ? handleAddNewTransition : handlePopupAction}>+ Add new</a>
        </nav>
      </header>
  );
};

export default NavBar;
