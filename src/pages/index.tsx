import React from "react";
import { navigate } from "gatsby";
//css
import "../assets/css/main.css";
//components
import Header from "../components/header";
import Lolly from "../components/lolly";

const Index = () => {
  return (
    <div>
      <Header />
      <div className="listLollies">
        <Lolly />
        <Lolly />
        <Lolly />
        <Lolly />
        <Lolly />
      </div>
      <button
        onClick={() => {
          navigate("/createLolly");
        }}
      >
        create Lolly
      </button>
    </div>
  );
};

export default Index;
