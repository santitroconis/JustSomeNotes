import "./form.css";

export default function Form({ children, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
