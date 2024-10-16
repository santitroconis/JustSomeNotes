import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import Nota from "../components/Nota";
import Loader from "../components/loader";
import "../styles/dashboard.css";

// JASON WEB TOKEN
// LOCAL STORAGE O COOKIES
// PARAMERTROS POR EL HEADER

export default function Dashboard() {
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
              {notes === null ? (
                <Loader />
              ) : (
                notes?.map((note) => {
                  return (
                    <Nota
                      key={note.uuid}
                      name={note.name}
                      description={note.description}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="dashboard_note_title">Title</div>
          <div className="dashboard_content">
            <div className="dashboard_note_description">Description</div>
            <div className="dashboard_content_body"></div>
          </div>
        </div>
      )}
    </div>
  );
}
