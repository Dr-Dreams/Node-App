import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import HeadAndTail from "./HeadAndTail";
import "./Home.css"; // Import the CSS file for the Home page

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <div className="navigation">
        <Link to="/home/about" className="nav-link">
          About
        </Link>
        <Link to="/home/head-tail" className="nav-link">
          Head & Tail
        </Link>
      </div>
    </div>
  );
}

export default Home;
