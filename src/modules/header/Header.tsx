import React, { useState } from "react";
import {
  Header as Head,
  Burger,
  Navigation,
} from "@modules/header/HeaderStyle";
import { Container, Nav, Navbar } from "react-bootstrap";

interface HeaderProps {
  isLogedIn?: boolean;
  mapShown: boolean;
  setMapShown: (mapShown: boolean) => void;
  menuOpened: boolean;
  setMenuOpened: (isMenuOpened: boolean) => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  isLogedIn,
  mapShown,
  setMapShown,
  setMenuOpened,
  menuOpened,
}) => {
  const menuHandler = (): void => {
    setMenuOpened(!menuOpened);
  };

  return (
    <Head>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Burger onClick={menuHandler} menuOpened={menuOpened}>
            <span></span>
          </Burger>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Head>
  );
};

export default Header;
