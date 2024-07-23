import { createBrowserRouter } from "react-router-dom";
import { App } from "@/components/App/App";
import { Suspense } from "react";
import { LazyAbout } from "@/pages/about/About.lazy";
import { Dictionaries } from "../pages/Dictionaries/Dictionaries";
import { DictionaryPage } from "../modules/dictionaryModule/pages/DictionaryPage/DictionaryPage";

const routes = [
    {
        path: "/",
        element: <Dictionaries />,
    },
    {
        path: '/dictionary/:title',
        element: <DictionaryPage />
    }
]

export const router = createBrowserRouter(routes);
export default routes;