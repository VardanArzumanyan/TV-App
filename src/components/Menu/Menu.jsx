import { useState } from "react";

import Icon1 from "../../icons/Icon1.png";
import Icon2 from "../../icons/Icon2.png";
import Icon3 from "../../icons/Icon3.png";
import Icon4 from "../../icons/Icon4.png";
import Icon5 from "../../icons/Icon5.png";
import Icon6 from "../../icons/Icon6.png";

import ProfileImg from "../../img/ProfileImg.png";

import "./Menu.css";

const Menu = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
    onToggle(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onToggle(false);
  };

  return (
    <div
      className={`menu ${isOpen ? "menu-open" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu-content">
        <div className="profile-info">
          <img className="profile-icon" src={ProfileImg} alt="Profile Icon" />
          <div className="profile-name">Daniel</div>
        </div>

        <div className={`menu-items ${isOpen ? "menu-items-open" : ""}`}>
          <div className="menu-item">
            <img className="menu-item-icon" src={Icon1} alt="Search Icon" />
            <div className="menu-item-text">Search</div>
          </div>
          <div className="menu-item active">
            <img className="menu-item-icon" src={Icon2} alt="Home Icon" />
            <div className="menu-item-text">Home</div>
          </div>
          <div className="menu-item">
            <img className="menu-item-icon" src={Icon3} alt="TV Shows Icon" />
            <div className="menu-item-text">TV Shows</div>
          </div>
          <div className="menu-item">
            <img className="menu-item-icon" src={Icon4} alt="Movies Icon" />
            <div className="menu-item-text">Movies</div>
          </div>
          <div className="menu-item">
            <img className="menu-item-icon" src={Icon5} alt="Genres Icon" />
            <div className="menu-item-text">Genres</div>
          </div>
          <div className="menu-item">
            <img
              className="menu-item-icon"
              src={Icon6}
              alt="Watch Later Icon"
            />
            <div className="menu-item-text">Watch Later</div>
          </div>
        </div>

        <div className="menu-footer">
          <div className="footer-item">LANGUAGE</div>
          <div className="footer-item">GET HELP</div>
          <div className="footer-item">EXIT</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
