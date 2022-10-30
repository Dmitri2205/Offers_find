import React from 'react';

interface HeaderProps {
    isLogedIn?: boolean
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({isLogedIn}) => {

    return (
        <header className="header">
            <nav>
                <a href='/'>Home</a>
                <a href="/blog">Blog</a>
                {
                    isLogedIn?
                        <a href="/about">About</a> :
                        null
                }
            </nav>
        </header>
    )
}

export default Header;