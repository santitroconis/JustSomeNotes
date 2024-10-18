import "./input.css";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  minLength,
  maxLength,
  required,
}) => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default Input;
