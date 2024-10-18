import "./form.css";

const Form = ({ children }) => {
  return (
    <form className="form" action="">
      {children}
    </form>
  );
};

export default Form;
