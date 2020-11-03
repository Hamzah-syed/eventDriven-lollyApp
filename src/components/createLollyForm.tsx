import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//components
import Lolly from "./lolly";
import { textChangeRangeIsUnchanged } from "typescript";
import ErrorMsg from "../utils/errorMsg";

const initialValues = {
  title: "",
  url: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  url: Yup.string()
    .matches(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      "Enter correct url!"
    )
    .required("Website url is required"),
  description: Yup.string().required("Description is Required"),
});

const CreateLollyForm = () => {
  const onSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <div className="createLollyWrapper">
      <Lolly />
      <div className="colorSelectorContainer">
        <label htmlFor="topFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            // value={colorTop}
            type="color"
            name="topFlavor"
            id="topFlavor"
            onChange={(e) => {
              //   setcolorTop(e.target.value)
            }}
          ></input>
        </label>

        <label htmlFor="midFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            // // value={colorMid}
            type="color"
            name="midFlavor"
            id="midFlavor"
            // onChange={e => {
            // //   setcolorMid(e.target.value)
            // }}
          ></input>
        </label>

        <label htmlFor="botFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            // value={colorBot}
            type="color"
            name="botFlavor"
            id="botFlavor"
            onChange={(e) => {
              //   setcolorBot(e.target.value)
            }}
          ></input>
        </label>
      </div>

      <div className="lollyFormWrapper">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <p className="textFeildLabel">to</p>
            <div style={{ paddingBottom: "12px" }}>
              <Field
                name="title"
                type="text"
                label="Title"
                className="textFeild"
              />
              <ErrorMessage component={ErrorMsg} name="title" />
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <p className="textFeildLabel">say something nice</p>
              <Field
                style={{ resize: "none" }}
                className="textFeild"
                as="textarea"
                rows="7"
                name="title"
                type="text"
                label="Title"
              />
              <ErrorMessage component={ErrorMsg} name="title" />
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <p className="textFeildLabel">from</p>
              <Field
                name="title"
                type="text"
                label="Title"
                className="textFeild"
              />
              <ErrorMessage component={ErrorMsg} name="title" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateLollyForm;
