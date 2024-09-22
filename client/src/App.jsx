import { useState } from 'react';
import './App.css';
import { Home } from "./pages/Home.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { SignIn } from "./pages/auth/SignIn.jsx";
import { SignUp } from "./pages/auth/SignUp.jsx";
import AuthApp from "./components/AuthApp.jsx";
import {Recommend} from "./pages/Recommend.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<AuthApp />} />  
        </>
    ),
    { basename: import.meta.env.BASE_URL }
);

function App() {
    const [count, setCount] = useState(0);

    return (
        <RouterProvider router={router} />
    );
}

export default App;

