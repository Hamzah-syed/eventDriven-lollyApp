import React from "react";
import { graphql } from "gatsby";

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
      }
    }
  }
`;

const LollyPage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>hamzah</h1>
    </div>
  );
};

export default LollyPage;
