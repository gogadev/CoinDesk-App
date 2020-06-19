import React from "react";

import spinningImg from "../../assets/gif.gif";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <h1 className="title">
        <span>Coin_</span>Desk_
      </h1>
      <img className="img" src={spinningImg} alt="" />
    </header>
  );
};

export default Header;
