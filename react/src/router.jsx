import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/dashboard";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/login";
import Register from "./views/register";
import NotFound from "./views/notfound";
import Programs from "./views/programs";
import ProgramCreate from "./views/programCreate";
import ProgramPublicView from "./views/ProgramPublicView";
import ProgramAnswer from "./views/programAnswer";
import Home from "./views/home";
import UserLayout from "./components/UserLayout";
import VerifyEmail from "./components/VerifyEmail";
import VerifyEmailSent from "./components/VerifyEmailSent";
import LandingPage from "./views/landingPage";

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <DefaultLayout/>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
            {
                path: 'programs',
                element: <Programs />
            },
            {
                path: 'programs/create',
                element: <ProgramCreate />
            },
            {
                path: 'programs/:id',
                element: <ProgramCreate />
            },
            {
                path: 'programS/answer/:id',
                element: <ProgramAnswer />
            },
        ]
    },
    {
        path:'/user',
        element: <UserLayout />,
        children:[
            {
                path: 'home',
                element: <Home />
            },
            {
                path:'programS/public/:slug',
                element: <ProgramPublicView />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <LandingPage/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            
            
        ]
    },
    {
        path: '/verify-email/:token',
        element: <VerifyEmail/>
    },
    {
        path:"/verify-email-sent",
        element: <VerifyEmailSent />
    },
    {
        path:'/*',
        element: <NotFound/>
    },
    {
        path:'/forbidden',
        element: <NotFound/>
    },
])

export default router;