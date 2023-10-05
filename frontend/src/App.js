// Import necessary libraries and connect to Redux store
import React, { useEffect } from "react";
import AddBook from "./components/AddBook";
import { useDispatch} from "react-redux";
import { startApp } from "./action";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(startApp());
    }
    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter basename="/">
    <Routes>
    <Route path="/" Component={AddBook} />
      <Route path="/library" Component={BookList} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
