import "./flexwrapper.css";

const FlexWrapper = ({ children, className = "" }) => {
  return <div className={`flex-wrapper ${className}`}>{children}</div>;
};

export default FlexWrapper;
