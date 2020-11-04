import React from "react";
import { Router } from "@reach/router";
import FreezedLolly from "../csrPages/freezedLolly";
import { graphql } from "gatsby";

export const query = graphql`
  {
    allSitePage {
      nodes {
        path
      }
    }
  }
`;
const Lollies = ({
  data: {
    allSitePage: { nodes },
  },
  location,
}) => {
  let currentPath1 = `${location.pathname}`;

  currentPath1 = currentPath1.replace(/\/$/, "");

  const data = nodes.find((d) => d.path === currentPath1);
  console.log(currentPath1);

  return (
    <div>
      <Router>
        {/* Tells client router to load the song component when the path matches /lollies/:slug */}
        <FreezedLolly path="/lollies/:slug" />
      </Router>
    </div>
  );
};

export default Lollies;
