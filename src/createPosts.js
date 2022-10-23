import React, {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";


const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState(""); 
    const [willDeliver, setWillDeliver] = useState(); 
    const token = (localStorage.getItem('token'));
    const [posts, setPosts, profile, setProfile, messaged, setMessaged, username, fetchProfileData,fetchPostsData]= useOutletContext()

    async function formSubmitHandler (event) {
        event.preventDefault(); 
        
        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts",
                { method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        location: location,
                        willDeliver: willDeliver,
                    }         
                })
                }   
            )
            const data = await response.json(); 
            alert(data.success);
            fetchPostsData();
            fetchProfileData();
        } catch (error) {
            console.log(error); 
        }
    }   

    function updateTitleState(event) {
        setTitle(event.target.value)
    }

    function updateDescriptionState(event) {
        setDescription(event.target.value)
    }

    function updatePriceState(event) {
        setPrice(event.target.value)
    }

    function updateLocationState(event) {
        setLocation(event.target.value)
    }
    function updateWillDeliverState(event){
     setWillDeliver(event.target.checked)
   
          
    } 
    return (
        <div id='mainBody'>
                <div id='title'>Create New Posts:</div>
         <div id='postsList'>
            <form  id='newUserForm' onSubmit={formSubmitHandler}>
                <label id='createLabel'>Title: </label>
                    <input id='message' type="text" value={title} onChange={updateTitleState}></input>

                <label id='createLabel'>Description:</label>
                    <input id='message'type="text" value={description} onChange={updateDescriptionState}></input>

                <label id='createLabel'>Price:</label>
                    <input id='message' type="text" value={price} onChange={updatePriceState}></input>
            
            
                <label id='createLabel'>Location:</label>
                    <input id='message' type="text" value={location} onChange={updateLocationState}></input>

                <label id='createLabel'>Will Deliver: 
                    <input id='deliver' type="checkbox" onChange={updateWillDeliverState}>
                    </input> 
                </label>
                
                    


                <button id='button'type="submit">Submit Posts</button>
            </form>
         </div>
        </div>
    )
};

export default Create;