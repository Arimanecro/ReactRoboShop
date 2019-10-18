import React from "react";
import MobileSideMenu from "../menu/mobile/SideMenu";
import BarMenu from "../menu/mobile/BarMenu";
import CurrencyMobile from "../menu/mobile/CurrencyMobile";

export default function Header(props: any) {
  return (
    <>
      <BarMenu />
      <CurrencyMobile />
      <MobileSideMenu />
    </>
  );
}
