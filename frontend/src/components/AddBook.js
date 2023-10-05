import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../action";

function AddBook() {
  const dispatch = useDispatch();
  const [addingTitle, setAddingTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const handleAdd = async (e) => {
    e.preventDefault();
    await dispatch(addBook(addingTitle, authorName));
    setAddingTitle("");
    setAuthorName("");
  };
  return (
    <div>
      <h2>Add Book</h2>
      <form method="POST" onSubmit={(e) => handleAdd(e)}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={addingTitle}
          onChange={(e) => {
            setAddingTitle(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          name="name"
          placeholder="Book author"
          value={authorName}
          onChange={(e) => {
            setAuthorName(e.target.value);
          }}
        />
        <br />
        <br />
        <input type="submit" value="Add" />
      </form>

      <a href="/library">Go to the library</a>
    </div>
  );
}

export default AddBook;
