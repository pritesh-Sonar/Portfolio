import "./App.css";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";


const Projects = React.lazy(() => import("./components/Projects.jsx"));
const Resume = React.lazy(() => import("./components/Resume"));
const Contact = React.lazy(() => import("./components/Contact"));
const Home = React.lazy(() => import("./components/Home"));
const Thoughts = React.lazy(() => import("./components/Thoughts"));
const Journey = React.lazy(() => import("./components/Journey"));


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/home" element={<Home theme={theme} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/journey" element={<Journey />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
