import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import Nota from "../components/Nota";
import "../styles/home.css";

export default function Home() {
  const [notes, setNotes] = useState(null);

  async function getData() {
    const { data, error } = await supabase.from("note_1").select("*");
    setNotes(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Home">
      {notes === null ? (
        <img
          className="home_logo"
          src="/src/assets/images/JSN-logo.svg"
          alt="app_logo"
        />
      ) : (
        <div className="home_wrapper">
          <div className="home_div_logo">
            <img
              className="home_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />
          </div>
          <div className="home_sidebar">
            <div className="home_container">
              {notes === null
                ? console.log("Loading notes...")
                : notes?.map((note) => {
                    return (
                      <Nota
                        key={note.uuid}
                        name={note.name}
                        description={note.description}
                      />
                    );
                  })}
            </div>
          </div>
          <div className="home_header">
            {" "}
            The simplest way <br />
            to keep notes
          </div>
          <div className="home_content"></div>
        </div>
      )}
    </div>
  );
}
