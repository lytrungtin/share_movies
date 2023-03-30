import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
const ShareListing = ({ items }) => {
  return (
   <div>
    <div className="container">
    <div className="col-12 text-start">
    {items.map((share) => {
        return (
            <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={share.id}
            >
                <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="col-md-6 videoWrapper">
                    <iframe
                    src={`https://www.youtube.com/embed/${share.uid}?rel=0`}
                    frameBorder="0"
                    allowFullScreen
                    />
                </div>
                <div className="col-md-6">
                    <p>
                    <span className="title">{share.title}</span>
                    </p>
                    <p>
                    <span className="user">Shared by: {share.user.email || 0}</span>
                    </p>
                    <p>
                    {share.likes} <FontAwesomeIcon icon={icon({name: 'thumbs-up', style: 'regular'})} />
                    {share.dislikes} <FontAwesomeIcon icon={icon({name: 'thumbs-down', style: 'regular'})} />
                    </p>
                    <span>Description:</span>
                    <p className="description">{share.description.slice(0, 150)}</p>
                </div>
                </div>
            </div>
        )
    })}
    </div>
    </div>
   </div>
  );
  ShareListing.propTypes = {
    items: PropTypes.array.isRequired,
  };
}

export default ShareListing