import React, {useState} from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";

const SendMessage = () => {
    const [detail,,,,,,, fetchProfileData, fetchPostsData, userCheck]  = useOutletContext();
    const [content, setContent] = useState("");
    // console.log ('Detailed Sales list:', detail)

    const {forSale, sendMessage} = useParams();

    // console.log("Params: ", useParams())
    // console.log("This is our parameter: ", forSale)

    const messageSeller = detail[forSale]; 

    async function sendForm (event) {
        event.preventDefault(); 

        try {
            const response = await fetch(
                `https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${messageSeller._id}/messages`,
                
                { method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    message: {
                        content: content
                    }         
                })
                }   
            )

            const data = await response.json(); 
            console.log('Translated', data)
            alert(data.success);
            fetchProfileData();
            fetchPostsData();
            userCheck();
        } catch (error) {
            console.log(error); 
        }
    }   

    function updateSendMessage(event) {
        setContent(event.target.value)
    }
    return (
        <div id='mainBody'>
            <div id='title'><p> Send Message</p></div>
            {
                messageSeller.title && messageSeller.title.length ?
                <div id='postsList'>
                    <h1>{messageSeller.title}</h1>
                
                    <p>Seller {messageSeller.author.username} writes:</p>
                
                    <p>{messageSeller.description}</p>
                
                    <p>Will Deliver: {messageSeller.willDeliver ? ' Yes' : ' No'}</p>
                
                    <p>Asking Price: {messageSeller.price}</p>
                    <form id='sendMessageForm' onSubmit={sendForm}>
                        <label id='messageLabel'>Message: 
                        <input id='message' type="text" value={content} onChange={updateSendMessage}></input>
                        </label>
                        
                        <br />
                        
                        <button id='button'type="submit">Submit Message</button>
                        <button id='button'><Link to='/posts'> Return to Posts </Link></button>
                    </form>
             
                
                </div> 
                : <p>This item is currently unavailable.</p>
            }
           
        </div>
    )
};

export default SendMessage; 