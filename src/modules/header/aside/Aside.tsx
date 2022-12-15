import React, { MutableRefObject, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AsideBlock } from "../HeaderStyle";
import { api } from "@API";
import { Dropdown, DropdownButton } from "react-bootstrap";
import experimental from "@icons/experimental.svg"

interface AsideProps {
  menuOpened?: boolean;
  childRef?: MutableRefObject<HTMLDivElement>;
}

type ILinks = {
  name:string,
  url: string,
  icon?: any,
  children?:Array<{
    name:string,
    url:string
  }>
}[];

const Aside: React.FC<AsideProps> = ({ menuOpened, childRef }) => {
  
  const location = useLocation();

  useEffect(() => {
    api
      .getDiscountsCategories()
      .then((res) => {
        // const {data} = res;
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [navLinks, setNavLinks] = useState<ILinks>([
    {
      name: "На главную",
      url: "/",
    },
    {
      name: "На карте",
      url: "/map",
    },
    // {
    //   name:"Отсканировать товар",
    //   url:"/scan",
    //   icon:experimental
    // },
    {
      name: "Список покупок",
      url: "/toBuy",
    },
    {
      name: "",
      url: "",
    },
  ]);

  // const [selectedCategory,setSelectedCategory] = useState<{ name: string; url: string; }>({name:'Категории',url:''});


  return (
    <AsideBlock menuOpened={menuOpened} id="aside_menu" ref={childRef}>
      {
         navLinks.map((link, i) => {
          const { name, url,icon } = link;
            return (
              <Link style={{display:`${location.pathname === url ? "none" : "inline-flex"}`}} to={url} key={`navLink${i}`}>
                {name}
                {
                  icon ? 
                  <span className="link-icon">
                    <img src={icon} alt="link_icon"/>
                    Эксперементальная функция
                  </span>
                  :
                  null
                }
              </Link>
            );
        })
      }
      <p>By Dmitry Baranov ©</p>
    </AsideBlock>
  );
};

export default Aside;
