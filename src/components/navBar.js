import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarElements.js";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" >
                        Search
                    </NavLink>
                    <NavLink to="/results" >
                        Results
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
