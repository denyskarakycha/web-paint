import "./Button.css";

// eslint-disable-next-line react/prop-types
const Button = ({ type, onClick, children }) => {
  if (type === 'click' && onClick) {
    return (
      <button className='button' onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <button className='button' type='submit'>
        {children}
      </button>
    );
  }
};

export default Button;
