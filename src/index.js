import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Homepage from "./homepage";
import Error from "./error";
import Posts from "./posts";
import Profile from "./profile";
import DetailSale from "./detailSale";
import Create from './createPosts';
import Login from './login';
import SendMessage from './inquire';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <Error />,
       
        children: [
            {
                path: "/posts",
                element: <Posts />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: '/posts/:forSale',
                element: <DetailSale />
            },
            {
                path: "/:forSale/:sendMessage",
                element: <SendMessage />
            },
            {
                path: '/createPosts',
                element: <Create />
            },
            {
                path: "/login",
                element: <Login />
            },   
        ]
    }
])

    ReactDOM.render(<RouterProvider router={router} />, document.getElementById("app")); 