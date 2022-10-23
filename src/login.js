import React, {useState} from "react";
import  {Link} from 'react-router-dom';
import { useOutletContext} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [, , , , , , , fetchProfileData, fetchPostsData, userCheck]= useOutletContext()
    async function formSubmitHandler (event) {
        event.preventDefault(); 
        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/login",{ 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            }
        )

        const data = await response.json(); 
            console.log("Translated data: ", data)

            localStorage.setItem("token", data.data.token)
        setUsername ("");
        setPassword ("");
        alert(data.data.message);
        userCheck()
        fetchProfileData()
        fetchPostsData()
        
        } catch (error) {
            console.log(error); 
        }
    } 
    
    async function formRegister (event) {
        event.preventDefault(); 
        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/register",
                { method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            }
        )

        const data = await response.json(); 
            console.log("Translated data: ", data)

            localStorage.setItem("token", data.data.token)
            alert(data.data.message);
            userCheck()
            userCheck()
            fetchProfileData()
            fetchPostsData()
            
        } catch (error) {
            console.log(error); 
        }
    }     

    function updateUsernameState(event) {
        setUsername(event.target.value)
    }

    function updatePasswordState(event) {
        setPassword(event.target.value)
    }

    return (
        <div id='mainBody'>
            <div id='title'>Please Login</div>
        <div id='postsList'>
            <form  id='newUserForm' >
                <label id='name'>Username:</label>
                    <input id='message' type="text" value={username} onChange={updateUsernameState}></input>

                <label id='password'>Password:</label>
                    <input id='message' type="password" value={password} onChange={updatePasswordState}></input>
            </form>
                <button id='button'onClick={formSubmitHandler} type="submit">Login</button>
                <button id='button' onClick={formRegister}>Register</button>
        </div></div>
    )
};

export default Login;