import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/dashboard";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/login";
import Register from "./views/register";
import NotFound from "./views/notfound";
import Programs from "./views/programs";
import ProgramCreate from "./views/programCreate";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/programs',
                element: <Programs />
            },
            {
                path: '/programs/create',
                element: <ProgramCreate />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
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
        path:'/*',
        element: <NotFound/>
    }
])

export default router;