import "./NavBar.css";

const NavBar = () => {
  return (
      <header className="header">
        <a href="#" className="logo">
          Web Paint 🎨
        </a>
        <nav className="navbar">
          <a href="/gallery">Gallery</a>
          <a href="/canvas">+ Add new</a>
        </nav>
      </header>
  );
};

export default NavBar;
