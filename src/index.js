import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/Query";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
    background-color: #1d1d2b;
  }
  
  a {
    text-decoration: none;
    color: inherit
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #2b2d42 14%,#2b2d42 56%);
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover{
    background: #2b2d42;
  }
  ::-webkit-scrollbar-track{
    background: #ffffff;
    border-radius: 7px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
 
  .loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  margin: 300px auto;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #FFF;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.icon-tabler {
    display: none;
  }

@media screen and (max-width: 1023px) {
  .icon-tabler {
    display: flex;
    z-index: 10;
    cursor: pointer;
  }
}

`;

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <App />
      <GlobalStyle />
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
