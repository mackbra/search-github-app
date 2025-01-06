// Filename - App.js

import React from "react";
import Navbar from "./components/navBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import SearchPage from './pages/SearchPage';
import SearchDetailsPage from './pages/SearchDetailsPage';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/details/:repoId" element={<SearchDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
