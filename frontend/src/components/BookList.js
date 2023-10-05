import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, updateBook } from "../action";

export default function BookList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.book.books);
  const [title, setTitle] = useState("");
  const handleUpdate = async (e, oldTitle) => {
    e.preventDefault();
    await dispatch(updateBook(oldTitle, title));
    setTitle("");
  };
  const handleDelete = async (e, title) => {
    e.preventDefault();
    await dispatch(deleteBook(title));
  };

  return (
    <div>
      <h2>Book List</h2>
      <ol>
        {data.books &&
          data.books.map((book) => (
            <div key={book}>
              <p>{book}</p>
              <form method="POST" onSubmit={(e) => handleUpdate(e, book)}>
                <input
                  type="text"
                  name="newtitle"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input type="submit" value="Update" />
              </form>
              <form method="POST" onSubmit={(e) => handleDelete(e, book)}>
                <input type="submit" value="Delete" />
              </form>
            </div>
          ))}
      </ol>
    </div>
  );
}
