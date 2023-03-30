import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


function Header () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <header className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
          <span id="logo">
            <FontAwesomeIcon
              icon={icon({ name: 'home', style: 'solid' })}
            />
            Funny Movies
          </span>
          <nav>
            <form onSubmit={handleLogin} className="navbar-form">
                <ul className="nav navbar-login navbar-right">
                    <li><input type="email" placeholder="Email" value={email} onChange={handleEmailChange} /></li>
                    <li><input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /></li>
                    <li><button type="submit" className="btn btn-default">Login / Register</button></li>
                </ul>
            </form>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header
