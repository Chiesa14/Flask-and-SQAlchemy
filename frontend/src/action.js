import axios from "axios";
import { bookStart, bookFailure, booksSuccess } from "./reducers";

export const startApp = () => async (dispatch) => {
  dispatch(bookStart());
  try {
    const response = await axios.get("http://127.0.0.1:5000/");
    const data = response.data;
    dispatch(booksSuccess(data));
  } catch (error) {
    dispatch(bookFailure(error));
    console.log("Failed to start app", error);
  }
};

export const fetchBook = () => async (dispatch) => {
  dispatch(bookStart());
  try {
    const response = await axios.get("http://127.0.0.1:5000/library");
    const data = response.data;
    dispatch(booksSuccess(data));
    console.log(data);
  } catch (error) {
    dispatch(bookFailure(error));
    console.error("Error Adding book:", error);
  }
};

export const addBook = (title, author) => async (dispatch) => {
  dispatch(bookStart());
  try {
    const response = await axios.post("http://127.0.0.1:5000/add", {
      title: title,
      name: author,
    });
    const data = response.data;
    dispatch(booksSuccess(data));
    alert("Success added the Book go to library to see the added book");
  } catch (error) {
    dispatch(bookFailure(error));
    console.error("Error fetching book:", error);
  }
};

export const updateBook = (oldTitle, title) => async (dispatch) => {
  dispatch(bookStart());
  try {
    const response = await axios.post("http://127.0.0.1:5000/update", {
      oldtitle: oldTitle,
      newtitle: title,
    });
    const data = response.data;
    dispatch(booksSuccess(data));
  } catch (error) {
    dispatch(bookFailure(error));
    console.error("Error Updating book:", error);
  }
};

export const deleteBook = (title) => async (dispatch) => {
  dispatch(bookStart());
  try {
    const response = await axios.post("http://127.0.0.1:5000/delete", {
      title: title,
    });
    const data = response.data;
    dispatch(booksSuccess(data));
  } catch (error) {
    dispatch(bookFailure(error));
    console.error("Error Deleting book:", error);
  }
};
