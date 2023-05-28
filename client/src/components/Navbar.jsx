import Logo from "../img/logo.png" ;
import {Link} from 'react-router-dom';
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

  const { currentUser, logout} = useContext(AuthContext);

  return (
    <div className="navbar">
    <div className="container">
      <div className="logo">
        <Link to ="/" >
        <img src={Logo} title="Home"></img>
        </Link>
      </div>
      <div className="links">
        <Link className='link' to="/?category=java">
          <h6>JAVA</h6>
          </Link>
        <Link className="link" to="/?category=javascript">
            <h6>JAVASCRIPT</h6>
          </Link>
          <Link className="link" to="/?category=ccplus">
            <h6>C/C++</h6>
          </Link>
          <Link className="link" to="/?category=csharp">
            <h6>C#</h6>
          </Link>
          <Link className="link" to="/?category=matlab">
            <h6>MATLAB</h6>
          </Link>
          <Link className="link" to="/profile">
          {currentUser && currentUser.img && (
            <div className="profile-image">
              <img src= {`../upload/${currentUser.img}`} alt="Profile" />
            </div>
          )}
          </Link>
          <Link className="link" to="/profile">
          <span>{currentUser?.username}</span>
          </Link>
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (<Link className="link" to="/login">
          Login
        </Link>)
          }
      </div>
      </div>
      </div>
  )
}

export default Navbar