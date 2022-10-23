import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import Profile from "./profile";
import { Outlet } from "react-router-dom";
import Create from "./createPosts";


const Homepage = () => {
    const [posts, setPosts] = useState([])
    const [profileItems, setProfile] = useState("");
    const [messaged, setMessaged] = useState("");
    const [username, setUserName] = useState([])

   
      const fetchPostsData = async ()=> {
            try {
                
                const response = await fetch("https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-FT/posts");
                
                const postsData = await response.json(); 
                // console.log('Translated Data', postsData)

                setPosts(postsData.data.posts.reverse())
            } catch (error) {
                console.log(error)
            }
        }

 useEffect(() => {  
        fetchPostsData(); 
    }, [])

    


const fetchProfileData = async() => {
           
            try {
                const response = await fetch(
                    "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",{ 
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            )
                
            const profileData = await response.json(); 
            setProfile(profileData.data)
            // setMessaged(profileData.data.messages)
                // console.log("Translated data: ", profileData)
    
            } catch (error) {
                console.log(error); 
            }
            
        }
    
    useEffect(() =>{     
        fetchProfileData()
    },[])

       
    useEffect(()=>{
        userCheck()   
    },[])

    const userCheck = async()=> {
    try {
        const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/test/me",{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
        
                }
            })
        
    
            
    const data = await response.json(); 
        console.log("Translated data: ", data)

        setUserName(data.data.user.username)
        // alert(data.data.message);
    } catch (error) {
        console.log(error);
        setUserName("") 
    }
}
    useEffect(()=>{
        userCheck()   
    },[])
   
const logout = () => {
    localStorage.removeItem('token');
    setUserName(""); 
    userCheck();
    fetchProfileData(); 
    alert('Logged Out')
}


    return (
        <div>
            
            <div id='header'>
                
                    <div><h1>Stranger's Things by William </h1></div>
                    <div>
                        <h3>Welcome {`${username}`}</h3>
                        <h3>Not You<button id='logoutButton' onClick={logout}>Log Out</button></h3>
                    </div>
                    {/* <Profile fetchProfileData={fetchProfileData}/>  */}
                </div>
               
            <div><Navbar /></div>
            
           <Outlet context={[posts, setPosts, profileItems, setProfile, messaged, setMessaged, username, fetchProfileData, fetchPostsData, userCheck]}/>
             
        </div>
    )
};

export default Homepage; 