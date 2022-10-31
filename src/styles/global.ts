import styled, {createGlobalStyle, ThemeProvider } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
}
`

export const ApplicationWraper = styled.div((props): string => {
    return `
    background-color: grey;
    `
});