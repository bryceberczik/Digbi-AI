import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css'
import App from './App.tsx'

import AuthGuard from "./components/AuthGuard.tsx";

import Home from "./pages/Home.tsx";
import JsonFiles from "./pages/JsonFiles.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        )
      },
      {
        path: "/json-files",
        element: <JsonFiles />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
      <RouterProvider router={router} />
  );
}