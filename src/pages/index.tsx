import React from "react";
import { navigate } from "gatsby";
//css
import "../assets/css/main.css";
//components
import Header from "../components/header";
import Lolly from "../components/lolly";
import { Button } from "../utils/button";
import { Box } from "../utils/box";

const Index = () => {
  return (
    <div>
      <Header />
      <div className="listLollies">
        <Lolly
          flavourTop="#C35671"
          flavourMiddle="#E93A3A"
          flavourBottom="#D52020"
        />
        <Lolly
          flavourTop="#C26671"
          flavourMiddle="#D94A3A"
          flavourBottom="#D53020"
        />
        <Lolly
          flavourTop="#C22671"
          flavourMiddle="#D92A3A"
          flavourBottom="#D51020"
        />
        <Lolly
          flavourTop="#C26671"
          flavourMiddle="#D92A3A"
          flavourBottom="#D53020"
        />
      </div>
      <Box pt="90px">
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <button
            className="mainButton"
            onClick={() => {
              navigate("/createLolly");
            }}
          >
            freez Lolly
          </button>
        </div>
      </Box>
    </div>
  );
};

export default Index;
