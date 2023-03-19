import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import App from "./App";
import JoinSession from "./components/JoinSession";
import CreateSession from "./components/CreateSession";
import VotingSite from "./components/VotingSite";
import Votes from "./components/Votes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/joinSession" element={<JoinSession />}></Route>
        <Route path="/createSession" element={<CreateSession />}></Route>
        <Route path="/voting" element={<VotingSite />}></Route>
        <Route path="/votes" element={<Votes />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
