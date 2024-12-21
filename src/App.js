import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import PostsList from "./features/posts/PostsList";
import PostDetails from "./pages/postDetails/PostDetails";
import Home from "./pages/home/HomePage";
import AboutUs from "./pages/about/AboutUs";
import ContactUs from "./pages/contact/ContactUs";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
