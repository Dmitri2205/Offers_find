import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { burgerSize } from "@modules/header/HeaderStyle";

export const AppColors = {
  gray:'#212529',
  purple:'slateblue',
  cream:'gainsboro'
}

export const GlobalStyle = createGlobalStyle`
html,body,p,span,h1,h2,h3,h4,h5,h6,figure {
    margin: 0;
    padding: 0;
}
body{
  background-color:${AppColors.gray};
}
`;

export const ApplicationWraper = styled.div((props): string => {
  return `
    display:block;
    height:auto;
    background-color: ${AppColors.gray};
    margin-top:${burgerSize};
    `;
});
