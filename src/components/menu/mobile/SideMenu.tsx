import React from "react";
import { Link } from "react-router-dom";

export default () => {

  let closeMenu = () => {
    let el: HTMLElement = document.querySelector('.cool_mob_menu');
    let uncheck: HTMLInputElement = document.querySelector('#currency_mobile');
    el.style.left = '-100%';
    uncheck.checked = false;
  }
  return (
    <nav className="cool_mob_menu">
      <label onClick={() => {
        let el: HTMLDivElement = document.querySelector('.cool_mob_menu');
        el.style.left = '-100%';
      }} htmlFor="show_menu" />
      <nav className="menu_side_mob">
        <ul>
          <Link to="/category/Home-Theater-System">
            <li onClick={() => closeMenu()}>Home Theater System</li>
          </Link>
          <Link to="/category/cell-mobile-wireless-phones">
            <li onClick={() => closeMenu()}>Cell/mobile/wireless phones</li>
          </Link>
          <Link to="/category/Computers">
            <li onClick={() => closeMenu()}>Computers</li>
          </Link>
          <Link to="/category/games-movies-music">
            <li onClick={() => closeMenu()}>Games/movies/music</li>
          </Link>
          <Link to="/category/cameras">
            <li onClick={() => closeMenu()}>Cameras</li>
          </Link>
          <Link to="/category/sound-devices">
            <li onClick={() => closeMenu()}>Sound devices</li>
          </Link>
          <Link to="/category/TVs">
            <li onClick={() => closeMenu()}>TVs</li>
          </Link>
          <Link to="/category/Video-game-consoles">
            <li onClick={() => closeMenu()}>Video game consoles</li>
          </Link>
          <Link to="/category/Home-security-systems">
            <li onClick={() => closeMenu()}>Home security systems</li>
          </Link>
          <Link to="/category/irons">
            <li onClick={() => closeMenu()}>Irons</li>
          </Link>
          <Link to="/category/Vacuum-Cleaner">
            <li onClick={() => closeMenu()}>Vacuum Cleaners</li>
          </Link>
        </ul>
      </nav>
    </nav>
  );
};
