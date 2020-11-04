import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Page404Compoent from "../components/Page404Compoent";
import Loader from "react-loader-spinner";
//data
import { useGetLollyBySlugQuery } from "../generated/graphql";
import { Box } from "../utils/box";
import Header from "../components/header";
import Lolly from "../components/lolly";
import { Link } from "gatsby";

const Page404 = ({ location }) => {
  const path = location.pathname.slice(1, 7);
  const slug = location.pathname.slice(7);

  if (path !== `lolly/` || slug === "") {
    return <Page404Compoent />;
  }
  const { loading, error, data } = useGetLollyBySlugQuery({
    variables: {
      slug: slug,
    },
  });
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Loader type="ThreeDots" color="#cbd5e0" />;
      </div>
    );
  }
  if (error) {
    return <Page404Compoent />;
  }
  // console.log(data);
  // console.log(path);
  // console.log(slug);
  return (
    <div>
      {path === `lolly/` || slug !== "" ? (
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
                    {data?.GetLollyBySlug?.from} made this virtual lollipop for
                    you. You can <Link to="/createLolly"> make your own</Link>{" "}
                    to send to a friend who deserve some sugary treat which
                    won't rot their teeth...
                  </p>
                </div>
              </div>
            </div>
          </Box>{" "}
        </div>
      ) : (
        <Page404Compoent />
      )}
    </div>
  );
};

export default Page404;
