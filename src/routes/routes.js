import Home from "../components/Home/Home";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import MainLayout from "../layout/MainLayout";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <SignUp></SignUp>
            },
            {
                path: "/login",
                element: <SignIn></SignIn>
            },
        ]
    }
]);


export default router;