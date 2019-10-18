import React from "react";
import { Link } from "react-router-dom";

export default React.memo((props: any) => {
  return (
    <ul>
      <Link to="/category/Home-Theater-System">
        <li>Home Theater System</li>
      </Link>

      <Link to="/category/cell-mobile-wireless-phones">
        <li>Cell/mobile/wireless phones</li>
      </Link>

      <Link to="/category/Computers">
        <li>Computers</li>
      </Link>

      <Link to="/category/games-movies-music">
        <li>Games/movies/music</li>
      </Link>

      <Link to="/category/cameras">
        <li>Cameras</li>
      </Link>

      <Link to="/category/sound-devices">
        <li>Sound devices</li>
      </Link>

      <Link to="/category/TVs">
        <li>TVs</li>
      </Link>

      <Link to="/category/Video-game-consoles">
        <li>Video game consoles</li>
      </Link>

      <Link to="/category/Home-security-systems">
        <li>Home security systems</li>
      </Link>

      <Link to="/category/irons">
        <li>Irons</li>
      </Link>

      <Link to="/category/Vacuum-Cleaner">
        <li>Vacuum Cleaners</li>
      </Link>
    </ul>
  );
});
