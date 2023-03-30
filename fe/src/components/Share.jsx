import React, { useState, useEffect } from 'react'
const Share = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchItems () {
      const response = await fetch('http://localhost:3000/shares')
      const fetchedItems = await response.json(response.data)
      setItems(fetchedItems.data)
    }
    fetchItems()
  }, [])
  const [inputUrl, setinputUrl] = useState('')
  const handleInputUrl = (e) => {
    setinputUrl(e.target.value)
  }
  return (
   <div>
	      <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
           <div className="row">
             <div className="text-center">
               <h2>Share a Youtube movie</h2>
             </div>
             <form className="col-12 p-2" >
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
         <div className="container">
            <div className="col-12 text-end">
            {items.map((elem, index) => {
              return (
                    <div
                      className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                      key={elem.id}
                    >
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        <div>
                          <h4>{elem.title}</h4>
                          <p>{elem.description}</p>
                        </div>
                        </div>
                    </div>
              )
            })}
            </div>
          </div>
   </div>
  )
}

export default Share
