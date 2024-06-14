import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
// @ts-ignore
// import shopRoutes from 'shop/Router';
import mainRoutes from 'main/Router';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ...shopRoutes,
      ...mainRoutes,
    ],
  },
]);