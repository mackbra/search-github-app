import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ResulstGrid from './results'
import { useNavigate } from "react-router-dom";


function SearchBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const handleChange = (event) => {
        setUsername(event.target.value);
      };
  function handleClick() {
        axios.get(`https://api.github.com/users/${username}`)
          .then(response => {
            setUserData(response.data);
            navigate("/results", 
                { state: { username } } // pass the username as a parameter in the state
            );
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setUserData(null);
          });
  }

  return (
    <><div>
          <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Enter GitHub username" />
          <button onClick={handleClick}>
              Fetch User
          </button>
      </div></>
  );
}

export default SearchBar;