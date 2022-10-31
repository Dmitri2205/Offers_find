import React,{useState} from 'react';
import  {
    Header as Head,
    Burger,
    Navigation
} from "@modules/header/HeaderStyle";

interface HeaderProps {
    isLogedIn?: boolean
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({isLogedIn}) => {

const [menuOpened,setMenu] = useState<boolean>(false);

const menuHandler = (): void => {
    setMenu(!menuOpened);
}

    return (
        <Head className="header">
            <Navigation>
                <Burger onClick={menuHandler} menuOpened={menuOpened} >
                    <span></span>
                </Burger>
                
            </Navigation>
        </Head>
    )
}

export default Header;