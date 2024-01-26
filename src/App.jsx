import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Notes from "./pages/Notes";
import CtreateNote from "./pages/CtreateNote";
import EditNote from "./pages/EditNote";
// import dummyNotes from "./dummy_notes"

import { useEffect, useState } from "react";
const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <main id="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CtreateNote setNotes={setNotes} />}
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </HashRouter>
    </main>
  );
};

export default App;
