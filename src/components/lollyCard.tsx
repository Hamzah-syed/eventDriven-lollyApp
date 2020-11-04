import React from "react";
import { navigate } from "gatsby";
import { useGetLollyBySlugQuery } from "../generated/graphql";

const LollyCard = ({ path, slug = "" }) => {
  const { data, loading, error } = useGetLollyBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    navigate("/404");
  }
  if (!data) {
  }
  console.log(data);
  return (
    <div>
      <h1>hamzah</h1>
    </div>
  );
};

export default LollyCard;
