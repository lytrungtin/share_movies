import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


function Header ({ isLoggedIn, setIsShare }) {
  const [email, setEmail] = useState(localStorage.getItem('email') || "");
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleShare = (event) => {
      event.preventDefault();
      setIsShare(true);
    };

    const handleHome = (event) => {
      event.preventDefault();
      setIsShare(false);
    };

    const handleLogin = async (event) => {
      event.preventDefault();
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            setErrors(data.error);
          } else {
            setErrors([]);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const handleLogout = async () => {
      const token = localStorage.getItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      isLoggedIn = false;
      setIsShare(false);
      await fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      })
      .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            setErrors(data.error);
          } else {
            setErrors([]);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

  return (
    <div>
      <header className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
          <a id="logo" className="btn" onClick={handleHome}>
            <FontAwesomeIcon
              icon={icon({ name: 'home', style: 'solid' })}
            />
            Funny Movies
          </a>
          <nav>
            {isLoggedIn() && email ? (
              <ul className="nav navbar-login navbar-right">
                <li><span>Welcome {email}</span></li>
                <li><button onClick={handleShare} className="btn btn-default">Share a movie</button></li>
                <li><button onClick={handleLogout} className="btn btn-default">Logout</button></li>
              </ul>
            ) : (
              <form onSubmit={handleLogin} className="navbar-form">
                  <ul className="nav navbar-login navbar-right">
                      <li><input type="email" placeholder="Email" value={email} onChange={handleEmailChange} /></li>
                      <li><input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /></li>
                      <li><button type="submit" className="btn btn-default">Login / Register</button></li>
                  </ul>
                  {errors.length > 0 && (
                    <div className="alert alert-danger">
                      <ul>
                        {Array.isArray(errors) ? (
                          errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))
                        ) : (
                          <li>{errors}</li>
                        )}
                      </ul>
                    </div>
                  )}
              </form>
            )}
          </nav>
        </div>
      </header>
    </div>
  );

  Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setIsShare,
  };
}

export default Header
