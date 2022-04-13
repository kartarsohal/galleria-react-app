import React from "react";

export default function Header(props) {
  return (
    <header className="main-header">
      <div className="logo-wrapper">
        <h1 className="logo">Galleria.</h1>
      </div>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="Search here..."
          className="search-input"
          value={props.searchValue}
          onChange={props.onChangeValue}
        />
        <button type="submit" onClick={props.submit} className="btn">
          Search
        </button>
      </div>
    </header>
  );
}
