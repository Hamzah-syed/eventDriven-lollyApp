import React from "react";
//css
import "../assets/css/main.css";
//components
import CreateLollyForm from "../components/createLollyForm";
import Header from "../components/header";

const CreateLolly = () => {
  return (
    <div>
      <Header />
      <div className="">
        <CreateLollyForm />
      </div>
    </div>
  );
};

export default CreateLolly;
