import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';


const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('JavaScript');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const [totalPage, setTotalPage] = useState(1); // Total number of pages
    const [totalRepos, setTotalRepos] = useState(0); // Total number of repositories available
    const resultsPerPage = 100; // Number of results per page
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalRepos / resultsPerPage);
    const fetchRepos = (currentPage) => {
        setLoading(true); // Set loading state to true
        fetch(
          `https://api.github.com/search/repositories?q=${search}+language:${language}&sort=stars&order=desc&per_page=${resultsPerPage}&page=${currentPage}`
        )
          .then((response) => response.json())
          .then((data) => {
            setRepos(data.items || []); // Set repos for the current page
            setTotalPage()
            setTotalRepos(data.total_count); // Set the total number of repos for pagination
            setLoading(false); // Set loading state to false
          })
          .catch((error) => {
            console.error(error);
            setLoading(false); // Handle error and stop loading
          });
      };

      const handleClick = (event) => {
        event.preventDefault();
        setPage(1);
        fetchRepos(page); // Fetch data for the current page when the search button is clicked
      };
    const handlePreviousChange = (event) => {
        setPage(page - 1);
        fetchRepos(page - 1);
    }
      const handleNextChange = (event) => {
        setPage(page + 1);
        fetchRepos(page + 1);
      };
    
  const columns = [
    {
      field: 'name',
      headerName: 'Repository Name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        params.row ? (
          <button onClick={() => navigate(`/details/${params.row.id}`)}>View Details</button>
        ) : null
      ),
    },
  ];
  const rows = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description available',
    owner: repo.owner.login,
    stargazers_count: repo.stargazers_count,
  }));


  return (
    <div className="Github-display">
      <h1>GitHub Repo Search</h1>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search repositories..."
      />
      <br />
      <label htmlFor="language">Choose Language: </label>
      <select id="language" value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="C#">C#</option>
      </select>
        <br/>
        <button onClick={handleClick} disabled={loading}>
            Search Repos
        </button>
        <div style={{ height: 500, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading} // Show loading indicator while fetching
          getRowId={(row) => row.id} // Define a unique ID for each row
        />
        </div>
        <br />
        <div className="pagination-controls">
            <button onClick={handlePreviousChange}>
                Previous Page
            </button>
            <label className="pages-label"> {totalRepos > 0 ? `Page ${page} of ${totalPages}` : 'No results found'}</label>
            <button onClick={handleNextChange}>
                Next Page
            </button>
        </div>
    </div>
  );
};

export default SearchPage;