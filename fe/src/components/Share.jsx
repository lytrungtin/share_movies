import React, { useState, useEffect } from 'react'
import ShareListing from './ShareListing'
import ShareForm from './ShareForm'
const Share = ({ isLoggedIn, is_share, items, setItems }) => {

  async function fetchItems () {
    const response = await fetch('http://localhost:3000/shares')
    const fetchedItems = await response.json(response.data)
    setItems(fetchedItems.data)
  }
  useEffect(() => {
    fetchItems()
  }, [])
  return (
   <div>
      {isLoggedIn() && is_share ? (
        <ShareForm setItems={setItems} fetchItems={fetchItems} />
      ) : (
        <ShareListing items={items} />
      )}
   </div>
  );
  Share.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    is_share: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    setItems
  };
}

export default Share
