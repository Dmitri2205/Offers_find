import React,{useState} from 'react';
import  {
    Header as Head,
    Burger,
    Navigation
} from '@modules/header/HeaderStyle';

interface HeaderProps {
    isLogedIn?: boolean;
    mapShown:boolean;
    setMapShown:(mapShown:boolean) => void;
    menuOpened: boolean;
    setMenuOpened: (isMenuOpened:boolean) => void;
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({isLogedIn,mapShown,setMapShown,setMenuOpened,menuOpened}) => {


const menuHandler = (): void => {
    setMenuOpened(!menuOpened);
}

    return (
        <Head>
            <Navigation>
                <Burger onClick={menuHandler} menuOpened={menuOpened} >
                    <span></span>
                </Burger>
            </Navigation>
        </Head>
    )
}

export default Header;