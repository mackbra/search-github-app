// Filename - App.js

import React from "react";
import Navbar from "./components/navBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import NotFound from "./pages/notFoundPage";
import Results from "./pages/resultsPage";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                <Route
                    path="/not-found"
                    element={<NotFound />}
                />
            </Routes>
        </Router>
    );
}

export default App;
