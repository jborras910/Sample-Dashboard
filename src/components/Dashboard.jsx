import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

import user_pic from "../assets/2x2.png";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // const handleSearchInputChange = (event) => {
  //   const newSearchQuery = event.target.value;
  //   setSearchQuery(newSearchQuery);

  //   // Update the URL with the search query
  //   navigate(`?/${encodeURIComponent(newSearchQuery)}`);
  // };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdown, setDropDown] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDropDown(false);
  };

  const handleDropdown = () => {
    setDropDown(!dropdown);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURIComponent(searchQuery.toLowerCase());

    let textToRetrieve = "search";

    if (encodedSearchQuery.includes("about")) {
      textToRetrieve = "about"; // Replace with the actual text for "About"
    } else if (encodedSearchQuery.includes("service")) {
      textToRetrieve = "service"; // Replace with the actual text for "Service"
    } else if (encodedSearchQuery.includes("project")) {
      textToRetrieve = "project"; // Replace with the actual text for "Project"
    } else if (encodedSearchQuery.includes("contact")) {
      textToRetrieve = "contact"; // Replace with the actual text for "Contact"
    }
    navigate(`/${textToRetrieve}`);
    setSearchQuery("");
  };

  return (
    <div className={`${sidebarOpen ? "dashboard-main-1" : "dashboard-main-2"}`}>
      <div className="sidebar">
        <div className="sidebar-header d-flex align-items-center">
          <h6>
            <i className="fa-brands fa-joomla mr-1"></i>Dashboard
          </h6>
          <i
            className={`menu fa-solid ${
              sidebarOpen ? "fa-bars" : "fa-angles-right"
            }`}
            onClick={toggleSidebar}
          ></i>
        </div>
        <div className="sidebar-body">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                {" "}
                <i className="fa-solid fa-house "></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" exact activeClassName="active">
                {" "}
                <i className="fa-solid fa-address-card "></i>
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Service" exact activeClassName="active">
                <i className="fa-brands fa-servicestack "></i>
                <span>Service</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Project" exact activeClassName="active">
                <i className="fa-solid fa-diagram-project "></i>
                <span>Project</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" exact activeClassName="active">
                <i className="fa-solid fa-address-book "></i>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-dash">
        <div className="navbar  align-items-center">
          <div className="">
            <form onSubmit={handleSubmitSearch}>
              <div class=" flex-row d-flex align-items-center">
                <i class="fa-solid fa-magnifying-glass"></i>{" "}
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="box-2 flex-row d-flex align-items-center">
            <i className="fa-solid fa-message"></i>
            <i className="fa-solid fa-bell"></i>

            <span
              onClick={handleDropdown}
              className="flex-row d-flex align-items-center"
            >
              <img className="rounded-circle mr-5" src={user_pic} alt="" />
              Jeferson Borras
              <i
                className={`fa-solid ${
                  dropdown ? "fa-caret-down" : "fa-caret-down"
                }`}
              ></i>
            </span>

            {dropdown && (
              <div className="drop-down">
                <ul>
                  <li>
                    <i className="fa-solid fa-gear mr-2"></i>Settings
                  </li>
                  <li>
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
