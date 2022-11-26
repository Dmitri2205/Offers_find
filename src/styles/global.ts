import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { burgerSize } from "@modules/header/HeaderStyle";

export const AppColors = {
  gray:'#212529',
  purple:'slateblue',
  cream:'gainsboro',
  orange:'darkorange'
}

export const GlobalStyle = createGlobalStyle`
html,body,p,span,h1,h2,h3,h4,h5,h6,figure {
    margin: 0;
    padding: 0;
}
body{
  background-color:${AppColors.gray};
  & .teleportedButton {
    display:inline-flex;
    width:28px;
    height:28px;
    border:1px solid ${AppColors.purple};
    background-color:${AppColors.gray};
    border-radius:50%;
    position:fixed;
    right:16px;
    bottom:16px;
    padding:0;
    overflow:hidden;
    box-shadow: 0px 0px 5px ${AppColors.cream};
    z-index:9999;
    & > img{
      width:100%;
      height:100%;
    }
  }
}
`;

export const ApplicationWraper = styled.div((props): string => {
  return `
    display:block;
    height:auto;
    background-color: ${AppColors.gray};
    `;
});
