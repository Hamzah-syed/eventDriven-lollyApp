import React, { useEffect } from "react";
import { API } from "aws-amplify";
import { graphql, Link } from "gatsby";
import Header from "../components/header";
import { Box } from "../utils/box";
import Lolly from "../components/lolly";

export const query = graphql`
  query MyQuery($id: String!) {
    Lollies {
      getLolly(lollyId: $id) {
        id
        to
        from
        messsage
        colorTop
        colorMiddle
        colorBottom
      }
    }
  }
`;
const LollyPage = ({
  data: {
    Lollies: { getLolly },
  },
}) => {
  const isBrowser = () => typeof window !== "undefined";

  return (
    <div>
      <Header />
      <Box p="12px">
        <div className="freezedLollyCardWrapper">
          <Lolly
            flavourTop={getLolly.colorTop}
            flavourBottom={getLolly.colorBottom}
            flavourMiddle={getLolly.colorMiddle}
          />

          <div className="freezedLollyData">
            <div className="linkWrapper">
              <h4>Share this link with your frined</h4>
              <p>{`${isBrowser() ? location.origin : ""}/lolly/${
                getLolly.id
              }`}</p>
            </div>
            <Box p="20px" className="freezedLollyCard">
              <h1>to: {getLolly.to}</h1>
              <p>{getLolly.messsage}</p>
              <h3>From: {getLolly.from}</h3>
            </Box>
            <div className="recivermessage">
              <p>
                {getLolly.from} made this virtual lollipop for you. You can{" "}
                <Link to="/createLolly"> make your own</Link> to send to a
                friend who deserve some sugary treat which won't rot their
                teeth...
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default LollyPage;
