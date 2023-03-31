import React, { useState, useEffect } from 'react'
const API = process.env.REACT_APP_API_URL;
const ShareForm = ({setItems, fetchItems}) => {
  const [inputUrl, setinputUrl] = useState('')
  const handleInputUrl = (e) => {
    setinputUrl(e.target.value)
  }

  const [shareErrors, setshareErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleShareSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    await fetch(`${API}/shares`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ share: { url: inputUrl } }),
    })
    .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          setshareErrors(data.errors || data.error);
          setSubmitSuccess(false);
        } else {
          setshareErrors([]);
          setSubmitSuccess(true);
          fetchItems();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    let timeoutId;
    if (submitSuccess) {
      timeoutId = setTimeout(() => {
        setSubmitSuccess(false);
        setinputUrl('');
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [submitSuccess]);

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
          data-testid="input_url"
          placeholder="url"
          className="w-100 my-1 p-2"
          onChange={handleInputUrl}
          value={inputUrl}
        />
          <button className="btn btn-primary w-100 my-2">Share</button>
      </form>
      {shareErrors && Object.values(shareErrors).length > 0 && (
        <div className="alert alert-danger w-100 my-2">
          <ul>
            {typeof shareErrors === 'object' ? (
              Object.entries(shareErrors).map(([key, error]) => (
                <li key={key}>{error[0]}</li>
              ))
            ) : (
              <li>{shareErrors}</li>
            )}
          </ul>
        </div>
      )}
      {submitSuccess && (
        <div className="alert alert-success w-100 my-2">
          <div className="text-center">
            <p>Your video has been shared successfully!</p>
          </div>
        </div>
      )}
    </div>
  </div>
  );

  ShareForm.propTypes = {
    setItems,
    fetchItems
  };
}

export default ShareForm
