import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
import {Suspense} from "react";
import {LazyAbout} from "@/pages/about/About.lazy";

const routes = [
    {
        path: "/",
        element: <App />,
    },
]

export const router = createBrowserRouter(routes);

export default routes;