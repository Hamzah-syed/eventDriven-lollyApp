import React, { useEffect, useState } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Page404Compoent from "../components/Page404Compoent";

//data

import { Box } from "../utils/box";
import Header from "../components/header";
import Lolly from "../components/lolly";
import { Link } from "gatsby";
import { API } from "aws-amplify";

const getLolly = `
query getLolly($lollyId: String!) {
    getLolly(lollyId: $lollyId) {
      id
      to
      from
      messsage
      colorTop
      colorMiddle
      colorBottom
    }
  }
  
`;

const Page404 = ({ location }) => {
  const path = location.pathname.slice(1, 7);
  const id = location.pathname.slice(7);
  const [data, setData] = useState<any>();
  //   if (path !== `lolly/` || slug === "") {
  //     return <Page404Compoent />;
  //   }

  useEffect(() => {
    (async () => {
      const res = await API.graphql({
        query: getLolly,
        variables: {
          lollyId: id,
        },
      });
      console.log(res);
      setData(res);
    })();
  }, []);

  if (!data) {
    return (
      <div className="loderWrapper">
        <h1 style={{ color: "white " }}>loading...</h1>
        {/* <Loader type="ThreeDots" color="#cbd5e0" />; */}
      </div>
    );
  }
  console.log();
  if (data.data.getLolly === null) {
    return <Page404Compoent />;
  }
  // console.log(data);
  // console.log(path);
  // console.log(slug);
  return (
    <div>
      {path === `lolly/` || id !== "" ? (
        <div>
          <Header />
          <Box p="12px">
            <div className="freezedLollyCardWrapper">
              <Lolly
                flavourTop={data.data.getLolly.colorTop}
                flavourBottom={data.data.getLolly.colorBottom}
                flavourMiddle={data.data.getLolly.colorMiddle}
              />

              <div className="freezedLollyData">
                <div className="linkWrapper">
                  <h4>Share this link with your frined</h4>
                  <p>{`${location.origin}/lollies/${id}`}</p>
                </div>
                <Box p="20px" className="freezedLollyCard">
                  <h1>to: {data.data.getLolly.to}</h1>
                  <p>{data.data.getLolly.messsage}</p>
                  <h3>From: {data.data.getLolly.from}</h3>
                </Box>
                <div className="recivermessage">
                  <p>
                    {data.data.getLolly.from} made this virtual lollipop for
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
