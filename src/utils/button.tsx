import React from "react";
import styled, { keyframes } from "styled-components";

const shake = keyframes`
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
`;

export const Button = styled.button`
  padding: 8px 20px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  color: white;
  background-color: #4c51bf;
  animation: ${(props) => (props.shake ? shake : "")} 0.5s linear infinite;
  transition: 0.5s;
  &:hover {
    background: #4c41bf;
  }
  &:focus {
    outline: none;
    background: #4c51bf;
  }
`;
