import React, { useState, useEffect } from 'react'
const ShareForm = () => {
  const [inputUrl, setinputUrl] = useState('')
  const handleInputUrl = (e) => {
    setinputUrl(e.target.value)
  }

  const handleShareSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3000/shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ share: { url: inputUrl } }),
    })
    .then(async (response) => {
        const data = await response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
    <div className="row">
      <div className="text-center">
        <h2>Share a Youtube movie</h2>
      </div>
      <form className="col-12 p-2" onSubmit={handleShareSubmit}>
        <label htmlFor="title" className="my-2">
          Youtube URL
        </label>
        <input
          type="text"
          name="url"
          id="tiurltle"
          placeholder="url"
          className="w-100 my-1 p-2"
          onChange={handleInputUrl}
          value={inputUrl}
        />
          <button className="btn btn-primary w-100 my-2">Share</button>
      </form>
    </div>
  </div>
  );
}

export default ShareForm
