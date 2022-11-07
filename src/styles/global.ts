import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html,body,p,span,h1,h2,h3,h4,h5,h6,figure {
    margin: 0;
    padding: 0;
}
`;

export const ApplicationWraper = styled.div((props): string => {
  return `
    display:block;
    background-color: grey;
    `;
});
