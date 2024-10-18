import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import Nota from "../components/Nota";
import Loader from "../components/loader";
import "../styles/dashboard.css";

// JASON WEB TOKEN
// LOCAL STORAGE O COOKIES
// PARAMETROS POR EL HEADER

export default function Dashboard() {
  const [activeNote, setActiveNote] = useState(null);

  const [notes, setNotes] = useState(null);

  async function getData() {
    const { data, error } = await supabase.from("note_1").select("*");
    setNotes(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Dashboard">
      {notes === null ? (
        <Loader />
      ) : (
        <div className="dashboard_wrapper">
          <div className="dashboard_header">JUST SOME NOTES</div>

          <div className="dashboard_sidebar">
            <div className="dashboard_note_container">
              {notes?.map((note) => (
                <Nota
                  key={note.uuid}
                  uuid={note.uuid}
                  name={note.name}
                  description={note.description}
                  onClick={() => {
                    setActiveNote(note);
                    document
                      .querySelectorAll(".note")
                      .forEach((el) => el.classList.remove("active"));
                    document
                      .querySelector(`.note[data-key="${note.uuid}"]`)
                      .classList.add("active");
                  }}
                />
              ))}
            </div>
          </div>
          <div className="dashboard_note_title">
            {activeNote === null ? "Title" : <div>{activeNote.name}</div>}
          </div>
          <div className="dashboard_content">
            {activeNote === null ? (
              <div className="guide_flex">
                <div className="guide_text">Select or create a note</div>
              </div>
            ) : (
              <div className="dashboard_note_description">
                {activeNote === null ? "" : <div>{activeNote.description}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
