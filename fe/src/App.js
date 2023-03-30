import './App.css'
import React, {useState} from 'react'
import Header from './components/Header'
import Share from './components/Share'
function App () {
  const [is_share, setIsShare] = useState(false);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsShare={setIsShare} />
      <Share isLoggedIn={isLoggedIn} is_share={is_share} />
    </div>
  )
}

export default App
