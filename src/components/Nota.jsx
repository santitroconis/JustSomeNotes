import "./nota.css";

const Nota = ({ name, description }) => {
  return (
    <div className="note">
      <p className="note_title">{name}</p>
      <p className="note_description">{description}</p>
    </div>
  );
};

export default Nota;
