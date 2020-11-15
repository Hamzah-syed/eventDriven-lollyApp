import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from "formik";
import shortId from "shortid";
import * as Yup from "yup";
import { API } from "aws-amplify";
import axios from "axios";
//components
import Lolly from "./lolly";
import ErrorMsg from "../utils/errorMsg";
//interfaces
import { FlavoursType } from "../interfaces/flavoursType";
//styled component
import { Button } from "../utils/button";
import { Box } from "../utils/box";

const initialValues = {
  to: "",
  message: "",
  from: "",
};

const validationSchema = Yup.object({
  to: Yup.string().required("Recipient name is required"),

  message: Yup.string()
    .required("Message is required")
    .max(500, "Message should be less than 500 character"),
  from: Yup.string().required("Sender name is Required"),
});

const CreateLollyForm = () => {
  const [loading, setLoading] = useState(false);
  const [flavours, setFlavours] = useState<FlavoursType>({
    flavourTop: "#A4193B",
    flavourMiddle: "#DF4343",
    flavourBottom: "#DB2929",
  });

  const createLollyMutation = `
    mutation createLolly($newLolly: createLollyInput!){
      createLolly(newLolly:$newLolly) {
        colorBottom
        colorMiddle
        colorTop
        from
        id
        to
        messsage
      }
    }
  `;

  const addLolly = async (values) => {
    // console.log(res.data.createLolly);
  };

  const onSubmit = async (values, actions) => {
    // await addLolly(values);
    const id = shortId.generate();
    setLoading(true);
    const res: any = await API.graphql({
      query: createLollyMutation,
      variables: {
        newLolly: {
          id: id,
          to: values.to,
          messsage: values.message,
          from: values.from,
          colorTop: flavours.flavourTop,
          colorMiddle: flavours.flavourMiddle,
          colorBottom: flavours.flavourBottom,
        },
      },
    });
    axios
      .post(
        "https://codebuild.us-east-2.amazonaws.com/webhooks?t=eyJlbmNyeXB0ZWREYXRhIjoiS2Jwem56eEFPTWtja0FLN2xwL2tiUndmS2R0bWVBdk4zdSthUWo4OS9tb1dYNWNVU1lUY25PcytFMXNKNnUwelE4YnZJckFNRmtsS2FVUzA2cXc3V2dzPSIsIml2UGFyYW1ldGVyU3BlYyI6IlpMS1RjWjBVOHRiZmdWUkQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&v=1"
      )
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.error(error);
      });

    actions.resetForm({
      values: {
        to: "",
        message: "",
        from: "",
      },
    });
    setLoading(false);
    const slug = res.data.createLolly.id;
    navigate(`/lolly/${slug}`);
    // console.log(result);
  };

  return (
    <div className="createLollyWrapper">
      <Lolly
        flavourTop={flavours.flavourTop}
        flavourMiddle={flavours.flavourMiddle}
        flavourBottom={flavours.flavourBottom}
      />
      <div className="colorSelectorContainer">
        <label htmlFor="topFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            value={flavours.flavourTop}
            type="color"
            name="topFlavor"
            id="topFlavor"
            onChange={(e) => {
              setFlavours({
                ...flavours,
                flavourTop: e.target.value,
              });
            }}
          ></input>
        </label>

        <label htmlFor="midFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            value={flavours.flavourMiddle}
            type="color"
            name="midFlavor"
            id="midFlavor"
            onChange={(e) => {
              setFlavours({
                ...flavours,
                flavourMiddle: e.target.value,
              });
            }}
          ></input>
        </label>

        <label htmlFor="botFlavor" className="colorPickerLabel">
          <input
            className="colorPicker"
            value={flavours.flavourBottom}
            type="color"
            name="botFlavor"
            id="botFlavor"
            onChange={(e) => {
              setFlavours({
                ...flavours,
                flavourBottom: e.target.value,
              });
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
            <p className="textFeildLabel">to:</p>
            <div style={{ paddingBottom: "8px" }}>
              <Field
                name="to"
                type="text"
                label="Title"
                className="textFeild"
                placeholder="Recipient name"
              />
              <ErrorMessage component={ErrorMsg} name="to" />
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <p className="textFeildLabel">say something nice:</p>
              <Field
                style={{ resize: "none" }}
                className="textFeild"
                as="textarea"
                rows="7"
                name="message"
                type="text"
                label="Title"
                placeholder="Message..."
              />
              <ErrorMessage component={ErrorMsg} name="message" />
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <p className="textFeildLabel">from:</p>
              <Field
                name="from"
                type="text"
                label="Title"
                className="textFeild"
                placeholder="Sender name"
              />
              <ErrorMessage component={ErrorMsg} name="from" />
            </div>
            <Box pt={"4px"}>
              <Button
                shake={loading ? true : false}
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? "Freezing.." : "Freez!"}
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateLollyForm;
