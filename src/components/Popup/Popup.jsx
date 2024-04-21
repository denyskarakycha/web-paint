import './Popup.css';

const Popup = ({ show, children }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        {children}
      </section>
    </div>
  );
};

export default Popup;