import './App.css'
import React from 'react'
import Header from './components/Header'
import Share from './components/Share'
function App () {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Share isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
