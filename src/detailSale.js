import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";

const DetailSale = () => {
    const [details,,]  = useOutletContext();
    console.log ('Detailed Sales list:', details)

    const {forSale} = useParams();

    // console.log("This is the params obj: ", useParams())
    // console.log("This is our parameter: ", forSale)

    const thisSale = details[forSale];

    

    return (
        <div id='mainBody'>
            {
                thisSale.title && thisSale.title.length ?
               <div id='postsList'>
               
                    <h1>{thisSale.title}</h1>
                    <p>Seller {thisSale.author.username} writes:</p>
                    <p>{thisSale.description}</p>
                    <p>Will Deliver: {thisSale.willDeliver ? ' Yes' : ' No'}</p>
                    <p>Asking Price: {thisSale.price}</p>
                    <button id='button'><Link to='/posts'> Return to Posts </Link></button>
                    <button id='button'><Link to={`/${forSale}/${thisSale._id}`}> Send Message </Link></button>
                 </div>
                : <p>This item is currently unavailable.</p>
            }
           </div>
        
    )
};

export default DetailSale; 