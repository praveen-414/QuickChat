import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFoundPage";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useCurrentUser from "./customHooks/GetCurrentUser";
import Profile from "./Pages/Profile";
import useGetOtherUsers from "./customHooks/GetOtherUsers";
import useGetMessages from "./customHooks/GetMessages";
import { useEffect } from "react";
import socket from "./socket/socket";
import { useReducer } from "react";
import { setOnlineUsers } from "./redux/usersSlice";

const App = () => {
  useCurrentUser();
  useGetOtherUsers();
  useGetMessages();

  const { theme } = useSelector((state) => state.theme);
  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (userData) {
      socket.io.opts.query = {
        userId: userData?._id,
      };

         socket.connect(); 

      socket.on("onlineUsers", (allOnlineUsers) => {
        console.log(allOnlineUsers);
        dispatch(setOnlineUsers(allOnlineUsers));
      });
    }
    return () => {
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, [userData,dispatch]);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: userData ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "signup",
      element: userData ? <Navigate to="/" /> : <SignUpPage />,
    },
    {
      path: "login",
      element: userData ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
};

export default App;
