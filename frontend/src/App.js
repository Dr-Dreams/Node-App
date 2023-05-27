import React from "react";
import "./App.css";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import HeadAndTail from "./components/HeadAndTail";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/about" element={<About />} />
            <Route path="/home/head-tail" element={<HeadAndTail />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// function App() {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Perform authentication logic here, e.g., check credentials against a database
//     // You can modify this logic as per your requirements
//     if (
//       credentials.username === "admin" &&
//       credentials.password === "password"
//     ) {
//       setIsLoggedIn(true);
//       setCurrentPage("home");
//     } else {
//       alert("Invalid username or password");
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Perform signup logic here, e.g., create a new user in the database
//     // You can modify this logic as per your requirements
//     alert("Signup successful!");
//     setCurrentPage("login");
//   };

//   const renderPage = () => {
//     if (!isLoggedIn) {
//       return (
//         <div className="page-container">
//           {currentPage === "login" && (
//             <Login
//               credentials={credentials}
//               setCredentials={setCredentials}
//               handleLogin={handleLogin}
//               navigateTo={setCurrentPage}
//             />
//           )}
//           {currentPage === "signup" && (
//             <Signup
//               credentials={credentials}
//               setCredentials={setCredentials}
//               handleSignup={handleSignup}
//               navigateTo={setCurrentPage}
//             />
//           )}
//           <div className="button-container">
//             <button onClick={() => setCurrentPage("login")}>Login</button>
//             <button onClick={() => setCurrentPage("signup")}>Sign up</button>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="page-container">
//           {currentPage === "home" && <Home />}
//           {currentPage === "about" && <About />}
//           {currentPage === "head-tail" && <HeadAndTail />}
//           <div className="button-container">
//             <button onClick={() => setCurrentPage("home")}>Home</button>
//             <button onClick={() => setCurrentPage("about")}>About</button>
//             <button onClick={() => setCurrentPage("head-tail")}>
//               Head & Tail
//             </button>
//           </div>
//         </div>
//       );
//     }
//   };

//   return <div>{renderPage()}</div>;
// }
