import "./Button.css";

// eslint-disable-next-line react/prop-types
const Button = ({ children }) => {
  return <button className="button" type="submit">{children}</button>;
};

export default Button;
