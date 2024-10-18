import "./input.css";

const Input = ({
  type,
  value,
  name,
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
      name={name}
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
