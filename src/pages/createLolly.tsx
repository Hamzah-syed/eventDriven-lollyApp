import React from "react";
//css
import "../assets/css/main.css";
//components
import CreateLollyForm from "../components/createLollyForm";
import Lolly from "../components/lolly";

const CreateLolly = () => {
  return (
    <div className="container">
      <h1>Create Lolly</h1>
      <div className="">
        <CreateLollyForm />
      </div>
    </div>
  );
};

export default CreateLolly;
