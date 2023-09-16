import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import About from "./components/About";
import Service from "./components/Service";
import Project from "./components/Project";
import Contact from "./components/Contact";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/search" element={<SearchResults />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Service" element={<Service />}></Route>
            <Route path="/Project" element={<Project />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="*" element={<SearchResults />}></Route>
            {/* Catch-all route */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
