import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Nota from "../components/Nota";
import Loader from "../components/Loader";
import "../styles/dashboard.css";
import Trash from "/src/assets/images/trash.svg";
import Add from "/src/assets/images/add.svg";
import Save from "/src/assets/images/save.svg";
import Edit from "/src/assets/images/edit.svg";
import Logout from "/src/assets/images/logout.svg";

export default function Dashboard() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeNoteContent, setActiveNoteContent] = useState({
    name: "",
    description: "",
  });

  async function getData() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const { data, error } = await supabase
        .from("note")
        .select("*")
        .eq("username", user.username)
        .order("modified_at", { ascending: false });

      if (error) {
        console.error("Error fetching user notes:", error);
        setNotes([]);
      } else {
        setNotes(data);
      }
    } else {
      console.error("No user is logged in");
      setNotes([]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const EditClick = () => {
    setIsEditMode(true);
  };

  const SaveClick = async () => {
    if (activeNoteId) {
      const { error } = await supabase
        .from("note")
        .update({
          name: activeNoteContent.name,
          description: activeNoteContent.description,
          modified_at: new Date(),
        })
        .eq("note_uuid", activeNoteId);

      if (error) {
        console.error("Error updating note:", error);
      } else {
        console.log("Note updated successfully");
        getData();
      }
    }
    setIsEditMode(false);
  };

  const NoteClick = (note) => {
    setActiveNoteId(note.note_uuid);
    setActiveNoteContent({
      name: note.name,
      description: note.description,
    });
    setIsEditMode(false);
  };

  const AddNoteClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    const newNote = {
      username: user.username,
      name: "New Title",
      description: "New Description",
    };

    const { data, error } = await supabase.from("note").insert([newNote]);

    if (error) {
      console.error("Error creating note:", error);
    } else {
      location.reload();
      console.log("Note created successfully:", data);
      setActiveNoteId(data[0].note_uuid);
      setActiveNoteContent(newNote);
      setIsEditMode(true);
      getData();
    }
  };

  const DeleteClick = async () => {
    if (activeNoteId) {
      const { error } = await supabase
        .from("note")
        .delete()
        .eq("note_uuid", activeNoteId);

      if (error) {
        console.error("Error deleting note:", error);
      } else {
        console.log("Note deleted successfully");
        setActiveNoteId(null);
        setActiveNoteContent({ name: "", description: "" });
        getData();
      }
    }
  };

  const LogoutClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/home";
  };

  return (
    <div className="Dashboard">
      {notes === null ? (
        <Loader />
      ) : localStorage.getItem("user") === null ? (
        <div className="guide_flex">
          <div className="guide_text">Loading...</div>
        </div>
      ) : (
        <div className="dashboard_wrapper">
          <div className="dashboard_header_wrapper">
            <img
              className="logout_icon"
              src={Logout}
              alt="logout"
              onClick={LogoutClick}
            />
            <div className="dashboard_header">JUST SOME NOTES</div>
          </div>

          <div className="dashboard_sidebar">
            <div className="dashboard_note_container">
              {notes?.map((note) => (
                <Nota
                  key={note.note_uuid}
                  uuid={note.note_uuid}
                  name={note.name}
                  description={note.description}
                  onClick={() => NoteClick(note)}
                  isActive={activeNoteId === note.note_uuid}
                />
              ))}
            </div>
          </div>

          <div className="dashboard_note_title_wrapper">
            <div className="dashboard_note_title">
              {isEditMode ? (
                <input
                  className="edit_title_mode"
                  type="text"
                  value={activeNoteContent.name}
                  onChange={(e) =>
                    setActiveNoteContent({
                      ...activeNoteContent,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                <div>{activeNoteContent.name}</div>
              )}
            </div>
            <div className="note_icons_wrapper">
              <img
                className="notes_icon"
                src={Add}
                alt="add"
                onClick={AddNoteClick}
              />
              <img
                className="notes_icon"
                src={Save}
                alt="save"
                onClick={SaveClick}
              />
              <img
                className="notes_icon"
                src={Edit}
                alt="edit"
                onClick={EditClick}
              />
              <img
                className="notes_icon"
                src={Trash}
                alt="delete"
                onClick={DeleteClick}
              />
            </div>
          </div>
          <div className="dashboard_content">
            {activeNoteId === null ? (
              <div className="guide_flex">
                <div className="guide_text">Select or create a note</div>
              </div>
            ) : (
              <div className="dashboard_note_description">
                {isEditMode ? (
                  <textarea
                    className="edit_description_mode"
                    value={activeNoteContent.description}
                    onChange={(e) =>
                      setActiveNoteContent({
                        ...activeNoteContent,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{activeNoteContent.description}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
