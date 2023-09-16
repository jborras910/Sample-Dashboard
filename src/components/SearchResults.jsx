import React from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {


  return (
    <div className="container-fluid">
      <div className="container text-center mt-5">
        <h2 className="h2 text-danger text-bold mt-5">No records found</h2>
      </div>
    </div>
  );
}

export default SearchResults;
