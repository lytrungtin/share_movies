import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
 
function Header() {
    return (
      <div>
        <header class="navbar navbar-fixed-top navbar-inverse">
        <div class="container">
            <span id="logo"><FontAwesomeIcon icon="fa-sharp fa-solid fa-home" />Funny Movies</span>
            <nav>
            <ul class="nav navbar-nav navbar-right">
                <li>Log in / Register</li>
            </ul>
            </nav>
        </div>
        </header>
      </div>
    );
}
 
export default Header;
