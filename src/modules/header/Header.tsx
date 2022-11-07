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

const goToMap = (): void => {
    setMapShown(!mapShown);
}

    return (
        <Head>
            <Navigation>
                <Burger onClick={menuHandler} menuOpened={menuOpened} >
                    <span></span>
                </Burger>
                <span onClick={goToMap} style={{cursor:'pointer'}}>Карта</span>
            </Navigation>
        </Head>
    )
}

export default Header;