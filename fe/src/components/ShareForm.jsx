import React, { useState } from 'react'
const ShareForm = ({setItems}) => {
  const [inputUrl, setinputUrl] = useState('')
  const handleInputUrl = (e) => {
    setinputUrl(e.target.value)
  }

  const [shareErrors, setshareErrors] = useState([]);

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
        if (!response.ok) {
          setshareErrors(data.errors);
        } else {
          const items_response = await fetch('http://localhost:3000/shares')
          const fetchedItems = await response.json(items_response.data)
          setItems(fetchedItems.data)
          setshareErrors([]);
        }
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
      {shareErrors && Object.values(shareErrors).length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {Object.entries(shareErrors).map(([key, error]) => (
              <li key={key}>{error[0]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
  );

  ShareForm.propTypes = {
    setItems,
  };
}

export default ShareForm