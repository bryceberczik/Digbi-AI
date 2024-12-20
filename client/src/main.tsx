import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css'
import App from './App.tsx'

import { AuthGuard, LoggedInAuth } from "./components/AuthGuard.tsx";

import Home from "./pages/Home.tsx";
import JsonFiles from "./pages/JsonFiles.tsx";
import Feedback from "./pages/Feedback.tsx";
import Settings from "./pages/Settings.tsx";
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
        element: (
          <AuthGuard>
            <JsonFiles />
          </AuthGuard>
        )
      },
      {
        path: "/feedback",
        element: (
          <AuthGuard>
            <Feedback />
          </AuthGuard>
        )
      },
      {
        path: "/settings",
        element: (
          <AuthGuard>
            <Settings />
          </AuthGuard>
        )
      },
      {
        path: "/login",
        element: (
          <LoggedInAuth>
            <Login />
          </LoggedInAuth>
        )
      },
      {
        path: "/signup",
        element: (
          <LoggedInAuth>
            <Signup />
          </LoggedInAuth>
        )
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