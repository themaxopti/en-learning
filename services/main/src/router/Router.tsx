import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
import {Suspense} from "react";
import {LazyAbout} from "@/pages/about/About.lazy";
import { Dictionaries } from "../pages/Dictionaries/Dictionaries";

const routes = [
    {
        path: "/",
        element: <Dictionaries />,
    },
]

export const router = createBrowserRouter(routes);
export default routes;