import React from "react";
import Page404Compoent from "../components/Page404Compoent";

const Page404 = ({ location }) => {
  var queryLollies = location.pathname.slice(0, 9);
  var queryPath = location.pathname.slice(9);
  console.log(queryLollies);
  console.log(queryPath);
  return (
    <div>
      <Page404Compoent />
    </div>
  );
};

export default Page404;
