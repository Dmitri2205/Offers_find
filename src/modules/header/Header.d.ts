import React from "react";
interface HeaderProps {
    isLogedIn?: boolean;
    mapShown: boolean;
    setMapShown: (mapShown: boolean) => void;
    menuOpened: boolean;
    setMenuOpened: (isMenuOpened: boolean) => void;
    children?: React.ReactNode;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
