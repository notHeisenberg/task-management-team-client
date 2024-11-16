import Root from "@/layout/Root";
import Auth from "@/pages/Auth/Auth";
import Apps from "@/pages/Dashboard/Apps/Apps";
import Calender from "@/pages/Dashboard/Calender/Calender";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardHome from "@/pages/Dashboard/DashboardHome/DashboardHome";
import Settings from "@/pages/Dashboard/Settings/Settings";
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
            {
                path: "auth",
                element: <Auth />
            },
        ]
    },
    // signin & signup
    {
        path: "login",
        element: <Login></Login>
    },
    {
        path: "signup",
        element: <SignUp></SignUp>
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <DashboardHome />
            },
            {
                path: "calendar",
                element: <Calender />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "apps",
                element: <Apps />,
            },
        ]
    }
])

export default router;