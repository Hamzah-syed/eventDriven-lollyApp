import React from "react";
import { Router } from "@reach/router";
import FreezedLolly from "../csrPages/freezedLolly";

const Lollies = () => {
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
