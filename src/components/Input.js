import React, { useState } from "react";
import Popup from "./Popup";
import { Field } from "formik";

export default function Input(props) {
  const [focused, setFocused] = useState(false);
  const { id, errors, values, state, touched } = props;
  return (
    <div className="flex flex-col justify-center mx-auto">
      <label htmlFor={id} className="ml-12">
        {id}
      </label>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 mr-4 ${
            id === "bgColor" ? "border border-black" : ""
          } rounded-full shadow-lg`}
          style={{
            backgroundColor: !errors[id] ? values[id] : "transparent",
          }}
        ></div>
        <div
          className="relative"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <Field
            name={id}
            className="py-1 px-2 border-2 rounded-md outline-none"
            style={{
              borderColor: focused ? state?.theme.color : "transparent",
            }}
          />
          <Popup
            className="absolute"
            style={{
              top: "50%",
              right: "4px",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>
      {errors[id] && touched[id] ? (
        <div style={{ color: state?.theme.errorColor }}>{errors[id]}</div>
      ) : null}
    </div>
  );
}
