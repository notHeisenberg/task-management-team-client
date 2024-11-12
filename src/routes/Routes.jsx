import Root from "@/layout/Root";
import Auth from "@/pages/Auth/Auth";
import ErrorPage from "@/pages/Error/ErrorPage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            // {
            //     path: "login",
            //     element: <Login></Login>
            // },
            // {
            //     path: "signup",
            //     element: <SignUp></SignUp>
            // },
            {
                path: "auth",
                element: <Auth />
            }
        ]



    },
]);

export default router;