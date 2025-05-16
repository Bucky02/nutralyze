import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            src="/src/assets/logoIntero.png"
            alt="Logo Nutralyze"
            width="80px"
            height="80px"
          />
        </Link>
      </div>

      <div className="title-container">
        <p className="title">NUTRALYZE</p>
      </div>

      <div className="buttons-container">
        <button className="login-button">Accedi</button>

        <div className="dropdown">
          <button
            className="secondary-button"
            onClick={() => setIsOpen((prev) => !prev)}
          ></button>

          {isOpen && (
            <div className="dropdown-content">
              <a href="#info1">Info 1</a>
              <a href="#info2">Info 2</a>
              <a href="#info3">Info 3</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
