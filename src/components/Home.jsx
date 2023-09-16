import React, { useState, useEffect } from "react";
import { Data } from "./Data.js";

function Home() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(Data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Initial records per page
  const options = [10, 25, 50, 100]; // Dropdown options

  useEffect(() => {
    const searchTermWithoutSpaces = (search || "")
      .replace(/\s/g, "")
      .toLowerCase();
    const newFilteredData = Data.filter((item) => {
      const columns = ["first_name", "last_name", "email", "contact"];
      return (
        searchTermWithoutSpaces === "" ||
        columns.some((col) =>
          item[col]
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(searchTermWithoutSpaces)
        )
      );
    });

    setFilteredData(newFilteredData);
    setCurrentPage(1); // Reset to the first page when the search term changes
  }, [search]);

  useEffect(() => {
    // Sort data when sortOrder changes
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.first_name.localeCompare(b.first_name);
      } else {
        return b.first_name.localeCompare(a.first_name);
      }
    });
    setFilteredData(sortedData);
  }, [sortOrder, filteredData]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recordsToDisplay = filteredData.slice(firstIndex, lastIndex);
  const totalRecords = filteredData.length;
  const npage = Math.ceil(totalRecords / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function toggleSortOrder() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  function handleRecordsPerPageChange(event) {
    setRecordsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing records per page
  }

  return (
    <>
      <div className="home p-4 container-fluid">
        <div className="pagination-info text-left">
          <h4 className="h6 ">
            {" "}
            Showing {firstIndex + 1} to{" "}
            {lastIndex > totalRecords ? totalRecords : lastIndex} of{" "}
            {totalRecords} entries
          </h4>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-md-10">
            <input
              type="text"
              className="searchBar"
              placeholder="Search Here...."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="records-per-page-dropdown col-md-2">
            <select
              className="form-select  "
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  Show <span className="text-danger bg-primary">{option}</span>{" "}
                  entries
                </option>
              ))}
            </select>{" "}
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="no-record-found text-center mt-3">
            <h6 className="h5">No record found</h6>
          </div>
        ) : (
          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th scope="col" onClick={toggleSortOrder}>
                  Full Name
                  {sortOrder === "asc" ? (
                    <>
                      <i class="fa-solid fa-up-long ml-2 text-primary"></i>
                    </>
                  ) : (
                    <i class="fa-solid fa-down-long ml-2 text-primary"></i>
                  )}
                </th>
                <th scope="col">Email </th>
                <th scope="col">Contact</th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recordsToDisplay.map((data) => (
                <tr key={data.id}>
                  <td>{`${data.first_name} ${data.last_name}`}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td className="text-center">
                    <button className="btn btn-success">View Here</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prevPage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Home;
