import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Layout from "./Layout.jsx";
import Login from "./components/Login.jsx";
import Hero from "./components/Hero.jsx";
import AuthRoute from "./components/AuthRouter.jsx";
import AddStudent from "./components/AddStudent.jsx";
import DisplayAtt from "./components/DisplayAtt.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<AuthRoute element={<Hero />} />} />
      <Route path="login" element={<Login />} />
      <Route path="addStudent" element={<AddStudent />} />
      <Route path="showAttendence" element={<DisplayAtt />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
