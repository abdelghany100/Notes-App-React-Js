import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import NoteItem from "../components/NoteItem";
import { useEffect, useState } from "react";
const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handelSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handelSearch, [text]);

  const clearInput = (e) => {
    e.preventDefault();
    if (showSearch) {
      setText("");
    }
  };
  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            className="search"
            type="text"
            autoFocus
            placeholder="keyword..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handelSearch();
            }}
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {!showSearch ? <CiSearch /> : <GrClose onClick={clearInput} />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && (
          <p className="empty__notes"> Not notes found.</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;
