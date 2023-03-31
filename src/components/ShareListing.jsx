import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
const ShareListing = ({ items }) => {
  return (
   <div>
    <div className="container">
    <div className="col-12 text-start" data-testid="share-listing-item">
    {items.map((share) => {
        return (
            <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={share.id}
            >
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-6 videoWrapper">
                        <iframe data-testid="share-video"
                        src={`https://www.youtube.com/embed/${share.uid}?rel=0`} allowFullScreen
                        />
                    </div>
                    <div className="col-md-6">
                        <p>
                        <span className="title" data-testid="share-title">{share.title}</span>
                        </p>
                        <p>
                        <span className="user" data-testid="share-user">Shared by: {share.user.email || 0}</span>
                        </p>
                        <p>
                        {share.likes} <FontAwesomeIcon data-testid="share-likes" icon={icon({name: 'thumbs-up', style: 'regular'})} />
                        {share.dislikes} <FontAwesomeIcon data-testid="share-dislikes" icon={icon({name: 'thumbs-down', style: 'regular'})} />
                        </p>
                        <span>Description:</span>
                        <p className="description" data-testid="share-description">{share.description.slice(0, 150)}</p>
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
