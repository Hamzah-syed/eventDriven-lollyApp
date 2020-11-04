import React from "react";
import { Link } from "gatsby";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//data
import { useGetLollyBySlugQuery } from "../generated/graphql";
//components
import Lolly from "../components/lolly";
import { Box } from "../utils/box";
import Header from "../components/header";
import Page404Compoent from "../components/Page404Compoent";
import Loader from "react-loader-spinner";

interface props {
  path: string;
  slug?: string;
  location?: any;
}

const FreezedLolly: React.FC<props> = ({ path, slug = "", location }) => {
  const { data, loading, error } = useGetLollyBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  console.log(path);
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Loader type="ThreeDots" color="#cbd5e0" />;
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Page404Compoent />
      </div>
    );
  }

  console.log(data);

  console.log(location);
  return (
    <div>
      <Header />
      <Box p="12px">
        <div className="freezedLollyCardWrapper">
          <Lolly
            flavourTop={data?.GetLollyBySlug?.flavourTop}
            flavourBottom={data?.GetLollyBySlug?.flavourBottom}
            flavourMiddle={data?.GetLollyBySlug?.flavourMiddle}
          />

          <div className="freezedLollyData">
            <div className="linkWrapper">
              <h4>Share this link with your frined</h4>
              <p>{`${location.origin}/lollies/${slug}`}</p>
            </div>
            <Box p="20px" className="freezedLollyCard">
              <h1>to: {data?.GetLollyBySlug?.to}</h1>
              <p>{data?.GetLollyBySlug?.message}</p>
              <h3>From: {data?.GetLollyBySlug?.from}</h3>
            </Box>
            <div className="recivermessage">
              <p>
                {data?.GetLollyBySlug?.from} made this virtual lollipop for you.
                You can <Link to="/createLolly"> make your own</Link> to send to
                a friend who deserve some sugary treat which won't rot their
                teeth...
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default FreezedLolly;
