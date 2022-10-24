import React, {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import { useOutletContext, Link } from "react-router-dom";


const Profile = () => {

    const [posts, setPosts, profile, setProfile, messaged, setMessaged, username, fetchProfileData, fetchPostsData]= useOutletContext()
    // debugger
   const myPosts = profile ? profile.posts : null;
   const myMessages = profile ? profile.messages : null;
// console.log(messaged)

async function deletePosts (profilePosts) {
   
    try {

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-FT/posts/${profilePosts._id}`,{
            method: "DELETE",
            headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
       
        } 
    ) 
        const data = await response.json(); 
        console.log('Translated', data)
        fetchProfileData()
        fetchPostsData()
    } catch (error) {
        console.log(error)
    }
    
}

    return (
        <div>
             <div id='mainBody'>
             <div id='titleDiv'>
                <p id='title'>Your Posts:</p>
            </div>
                { 
                    myPosts && myPosts.length ? myPosts.map((profilePosts, idx) => {if (profilePosts.active == true){}
                         else {return}
                        // console.log('These are my Posts:', profilePosts)
                        return <div id='postsList' key={idx}>
                                <h3>{profilePosts.title}</h3>
                                <p>Location: {profilePosts.location}</p>
                                <p>{profilePosts.description}</p>
                                <p>Will Deliver: {profilePosts.willDeliver ? ' Yes' : ' No'}</p>
                                 <p>Asking Price: {profilePosts.price}</p>

                                 <div>
                                    {profilePosts.messages && profilePosts.messages.length ? profilePosts.messages.map((message, idx) => {
                            return  <div id='profileMessages' key={idx}>

                                <p>User: {message.fromUser.username} says --{message.content}</p></div>

                                    
                    }): <p>No Messages</p>
                }
                                </div>
                               
                                <button id='deleteButton' onClick= {()=> { deletePosts(profilePosts)}}>Delete Posts</button>
                                {/* <button id='editButton'>Edit Post</button> */}
                        </div>

       
                    }) : <div>There are no posts to show.</div>
                }
                
            </div>

            <div id='mainBody'>
                <div id='titleDiv'>
                    <p id='title'>Sent Messages:</p>
                </div>
            
                {
                    myMessages && myMessages.length ?  myMessages.map((viewMessages, idx) => {
                    {if (viewMessages.fromUser.username == username){}
                  
                            else {return}};
                            // console.log('These are my sent Messages:', viewMessages)
                        return <div id='postsList' key={idx}>
                                <h3>{viewMessages.post.title}</h3>
                                <p>You said --  {viewMessages.content}</p>
                               
                                <button id='postsButton'><Link to={`/posts/${idx}`}>More Details!!!</Link></button>
       
                        </div>
                    }) : <div>ERRRRRRRRRRRRRROOOOOOOORRRR.</div>
                }
            </div>
        </div>
    )
};


export default Profile;