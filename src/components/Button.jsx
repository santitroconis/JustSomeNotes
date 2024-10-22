import "./button.css";

const Button = ({ children, onClick, caption }) => {
  return (
    <button caption={caption} className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
