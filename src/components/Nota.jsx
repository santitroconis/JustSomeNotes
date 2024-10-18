import "./nota.css";

const Nota = ({ name, description, onClick, uuid }) => {
  return (
    <div className="note" onClick={onClick} data-key={uuid}>
      <p className="note_title">{name}</p>
      <p className="note_description">{description}</p>
    </div>
  );
};

export default Nota;
