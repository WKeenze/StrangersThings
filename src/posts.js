import React, {useState}   from "react";
import { useOutletContext, Link } from "react-router-dom";
import SendMessage from './inquire';


const Posts = () => {
    
   const [postsInfo,,]= useOutletContext()
   const [search, setSearch] = useState("")
//    console.log(postsInfo)


    return (
        <div>
            
             <div id='mainBody'>
             <div id='titleDiv'>
                <p id='title'>Posts:</p>
                <input id='search' type='text' onChange={event => setSearch(event.target.value)} placeholder='Search Posts...'></input>
{/* when searching posts it brings you to the wrong idx */}
            </div>
                {
                    postsInfo && postsInfo.length ?  postsInfo.filter(indivPosts => {
                           if (search === '') {
                             return indivPosts;
                           } else if (indivPosts.title.toLowerCase().includes(search.toLowerCase())) {
                             return indivPosts;
                           }
                        }).map((indivPosts, idx) => {if (indivPosts.active == true){}
                            else {return};

                        return <div id='postsList' key={idx}>
                                <h3>{indivPosts.title}</h3>
                                <p>Location: {indivPosts.location}</p>
                               
                                <button id='postsButton'><Link to={`/posts/${idx}`}>More Details!!!</Link></button>

                        
                        </div>
                    }) : <div>ERRRRRRRRRRRRRROOOOOOOORRRR.</div>
                }
            </div>
        </div>
    )
};

export default Posts; 