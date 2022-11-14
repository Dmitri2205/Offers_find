import React from "react";
import {
  Header as Head,
  Burger,
} from "@modules/header/HeaderStyle";
import { Container, Nav, Navbar } from "react-bootstrap";
import backButton from "@icons/back_button.svg"
import { useLocation } from "react-router-dom";

interface HeaderProps {
  isLogedIn?: boolean;
  mapShown: boolean;
  setMapShown: (mapShown: boolean) => void;
  menuOpened: boolean;
  setMenuOpened: (isMenuOpened: boolean) => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  setMenuOpened,
  menuOpened,
  children
}) => {
  const menuHandler = (): void => {
    setMenuOpened(!menuOpened);
  };
  const {pathname} =useLocation();


  return (
    <Head>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Burger onClick={menuHandler} menuOpened={menuOpened}>
            <span></span>
          </Burger>
          {
            pathname !== "/" ?
            <img src={backButton} alt="back_button"/>
            :
            null
          }
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      {children}
    </Head>
  );
};

export default Header;
