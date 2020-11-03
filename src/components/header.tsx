import React from "react";
import { navigate } from "gatsby";
//components
import { Box } from "../utils/box";

const Header = () => {
  return (
    <div>
      <div className="">
        <Box pt="50px" pb="50px">
          <h1 className="headerContent" style={{ fontSize: "50px" }}>
            virtual lollipop
          </h1>
          <h3 className="headerContent">
            because we all know someone who deserves some sugar.
          </h3>
        </Box>
      </div>
    </div>
  );
};

export default Header;
