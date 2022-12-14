import React, { MutableRefObject, useEffect, useState } from "react";
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
      {navLinks.map((link, i) => {
        const { name, url,icon } = link;
        // if (link.hasOwnProperty("children")) {
        //   return (
        //     <DropdownButton key={`category${i}`} id="category-dropdown" variant="secondary" menuVariant="dark" title={`${selectedCategory.name}`}>
        //       {
        //         link.children.map((child,j,i)=>{
        //           const {name,url} = child;
        //           return(
        //             <Dropdown.Item key={`item${j}OfCategory${i}`} onClick={(e)=>{setSelectedCategory(child)}}>{name}</Dropdown.Item>
        //             )
        //         })
        //       }
        //       </DropdownButton>
        //   );
        // } else {
          return (
            <Link to={url} key={`navLink${i}`}>
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
        // }
      })}
      <p>By Dmitry Baranov ©</p>
    </AsideBlock>
  );
};

export default Aside;
