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
        <Lolly
          flavourTop="#C25671"
          flavourMiddle="#D93A3A"
          flavourBottom="#D52020"
        />
        <Lolly
          flavourTop="#C25671"
          flavourMiddle="#D93A3A"
          flavourBottom="#D52020"
        />
        <Lolly
          flavourTop="#C25671"
          flavourMiddle="#D93A3A"
          flavourBottom="#D52020"
        />
        <Lolly
          flavourTop="#C25671"
          flavourMiddle="#D93A3A"
          flavourBottom="#D52020"
        />
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
