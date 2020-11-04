import React from "react";
import { graphql, Link } from "gatsby";
import { Box } from "../utils/box";
import Header from "../components/header";
import Lolly from "../components/lolly";

export const query = graphql`
  query MyQuery($slug: String!) {
    Lollies {
      GetLollyBySlug(slug: $slug) {
        to
        message
        from
        flavourTop
        flavourMiddle
        flavourBottom
        slug
      }
    }
  }
`;

const LollyPage = ({
  data: {
    Lollies: { GetLollyBySlug },
  },
}) => {
  console.log(GetLollyBySlug);
  return (
    <div>
      <Header />
      <Box p="12px">
        <div className="freezedLollyCardWrapper">
          <Lolly
            flavourTop={GetLollyBySlug.flavourTop}
            flavourBottom={GetLollyBySlug.flavourBottom}
            flavourMiddle={GetLollyBySlug.flavourMiddle}
          />

          <div className="freezedLollyData">
            <div className="linkWrapper">
              <h4>Share this link with your frined</h4>
              <p>{`${location.origin}/lollies/${GetLollyBySlug.slug}`}</p>
            </div>
            <Box p="20px" className="freezedLollyCard">
              <h1>to: {GetLollyBySlug.to}</h1>
              <p>{GetLollyBySlug.message}</p>
              <h3>From: {GetLollyBySlug.from}</h3>
            </Box>
            <div className="recivermessage">
              <p>
                {GetLollyBySlug.from} made this virtual lollipop for you. You
                can <Link to="/createLolly"> make your own</Link> to send to a
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
