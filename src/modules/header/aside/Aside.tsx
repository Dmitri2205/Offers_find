import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AsideBlock } from "../HeaderStyle";

interface AsideProps {
  menuOpened?: boolean;
}

const Aside: React.FC<AsideProps> = ({ menuOpened }) => {
  const asideMenu = useRef<null | HTMLDivElement>(null);

  const [navLinks] = useState([
    {
      name: "На главную",
      url: "/",
    },
    {
      name: "На карте",
      url: "/map",
    },
    {
      name: "Категории",
      url: "/categories",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
  ]);

  const asideClickHandler = (e: Event) => {
    const { target,currentTarget } = e;
    // if (currentTarget === "aside-menu") {
    // }
  };

  useEffect(() => {
    const { current } = asideMenu;
    current.addEventListener("click", asideClickHandler);
    return () => {
      current.removeEventListener("click", asideClickHandler);
    };
  }, []);

  const location = useLocation();

  return (
    <AsideBlock menuOpened={menuOpened} ref={asideMenu} id="aside_menu">
      {navLinks.map((link, i) => {
        const { name, url } = link;
        return (
          <Link to={url} key={`navLink${i}`}>
            {name}
          </Link>
        );
      })}
      <p>By Dmitry Baranov ©</p>
    </AsideBlock>
  );
};

export default Aside;
