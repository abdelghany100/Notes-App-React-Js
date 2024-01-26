import React, { useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCreateDate from "../components/useCreateDate";
const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id == id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navegate = useNavigate();
  const handelForm = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
    }
    // redirect home page
    navegate("/");
  };

  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const newNotes = notes.filter((item) => item.id != id);
      setNotes(newNotes);
      navegate("/");
    }
  };

  // redirect home page

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handelForm}>
          Save
        </button>
        <button className="btn danger" onClick={deleteNote}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handelForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </form>
    </section>
  );
};

export default EditNote;
