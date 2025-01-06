import React from "react";
import { useState } from "react";
import { Results } from "./results";

const getRepos = async (val) => {
  // condition that made sure that the fetch will only happen if the searchInput field is not empty
  if (searchInput) {
    const repos = await fetch(
      `https://api.github.com/users/${searchInput}/repos?per_page=8&page=${val}`
    );
    const data = await repos.json();
    setRepos(data);
  }
  return;
};

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  // I moved the repos and setRepos here from Result.js file
  const [repos, setRepos] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <p className="paragraph">Enter your github username below:</p>
      <div className="search-bar" style={{ padding: "50px" }}>
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={handleChange}
        />
        {/* Call your getRepo function here instead of using useEffect */}
        <button className="search-button" onClick={() => getRepos(1)}>
          Search
        </button>
      </div>
      <Results
        className="repos-list"
        name={searchInput}
        repos={repos}
        getRepos={getRepos}
      />
    </>
  )
}

export default SearchBar;
