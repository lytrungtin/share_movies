import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


function Header () {
  return (
      <div>
        <header className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
            <span id="logo"><FontAwesomeIcon icon={icon({name: 'home', style: 'solid'})} />Funny Movies</span>
            <nav>
            <ul className="nav navbar-nav navbar-right">
                <li>Log in / Register</li>
            </ul>
            </nav>
        </div>
        </header>
      </div>
  )
}

export default Header
