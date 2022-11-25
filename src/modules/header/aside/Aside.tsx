import React, { MutableRefObject, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AsideBlock } from "../HeaderStyle";
import { api } from "@API";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface AsideProps {
  menuOpened?: boolean;
  childRef?: MutableRefObject<HTMLDivElement>;
}

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

  const [navLinks, setNavLinks] = useState([
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
      children: [
        {
          name:'name1',
          url:"/ctaegories/1"
        },
        {
          name:'name2',
          url:"/ctaegories/2"
        },
        {
          name:'name3',
          url:"/ctaegories/3"
        },
        {
          name:'name4',
          url:"/ctaegories/4"
        },
        {
          name:'name5',
          url:"/ctaegories/6"
        },
      ],
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

  const [selectedCategory,setSelectedCategory] = useState<{ name: string; url: string; }>({name:'Категории',url:''});



  return (
    <AsideBlock menuOpened={menuOpened} id="aside_menu" ref={childRef}>
      {navLinks.map((link, i) => {
        const { name, url } = link;
        if (link.hasOwnProperty("children")) {
          return (
            <DropdownButton key={`category${i}`} id="category-dropdown" variant="secondary" menuVariant="dark" title={`${selectedCategory.name}`}>
              {
                link.children.map((child,j,i)=>{
                  const {name,url} = child;
                  console.log(`item${j}OfCategory${i}`)
                  return(
                    <Dropdown.Item key={`item${j}OfCategory${i}`} onClick={(e)=>{setSelectedCategory(child)}}>{name}</Dropdown.Item>
                    )
                })
              }
              </DropdownButton>
          );
        } else {
          return (
            <Link to={url} key={`navLink${i}`}>
              {name}
            </Link>
          );
        }
      })}
      <p>By Dmitry Baranov ©</p>
    </AsideBlock>
  );
};

export default Aside;
