import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after{
margin: 0;
padding:0;
box-sizing: border-box;
}

body{
      background-color: #fffffffa;
      font-family: "Open Sans";
}
ul{
      list-style-type: none;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "MonteCarlo", cursive;
  font-weight: 400;
  font-size: 40px;
  font-style: normal;

}
`;

export default GlobalStyle;
