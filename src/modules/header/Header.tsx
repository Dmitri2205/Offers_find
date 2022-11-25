import React, { JSXElementConstructor, SyntheticEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Header as Head,
  Burger
} from "@modules/header/HeaderStyle";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import TeleportedButton from "../../portals/BackButton";
import backButton from '@icons/back_button.svg';

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
  children,
}) => {
  const {pathname}  = useLocation();

  const menuHandler = (): void => {
    setMenuOpened(!menuOpened);
  };

  const navigate = useNavigate();

  const backButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    navigate(-1)
  };

  return (
    <Head>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Burger onClick={menuHandler} menuOpened={menuOpened}>
            <span></span>
          </Burger>
          {
            pathname !== "/" ?
            <TeleportedButton clickHandler={backButtonHandler}>
            <img src={backButton} alt="back_button"/>
          </TeleportedButton>
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
