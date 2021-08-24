import React, { useState } from "react";
import { useUserConfig } from "../context/userConfigContext";
import { Link } from "gatsby";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import Switch from "./Switch";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PaletteIcon from "@material-ui/icons/Palette";
import SettingsIcon from "@material-ui/icons/Settings";

const colorSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name is too Short")
    .max(50, "Name is too long")
    .required("Required"),
  color: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  navBgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  bgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  borderColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  boldBorderColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  highlightBgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  darkerHighlightBg: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  successColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  errorColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
  userSudokuNumColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/gi,
      "Not a valid color"
    )
    .required("Required"),
});

const Header = () => {
  const { state, dispatch } = useUserConfig();
  const [open, setOpen] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);
  const initialValues = {
    name: "",
    ...state?.theme,
  };

  return (
    <header
      style={{
        background: state?.theme.navBgColor,
        color: state?.theme.color,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
        className="flex items-center justify-between h-20 px-8"
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/">Sudoku</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            className="outline-none"
            onClick={setOpenColorModal.bind(null, true)}
          >
            <PaletteIcon fontSize="large" />
          </button>
          <button className="outline-none" onClick={setOpen.bind(null, true)}>
            <SettingsIcon fontSize="large" />
          </button>
          <Dropdown />
          <Modal open={openColorModal} setOpen={setOpenColorModal}>
            <div>
              <h2 className="pb-2 text-3xl font-bold">Color Builder</h2>
              <hr
                className="w-48 mb-4 border-b"
                style={{ borderColor: state?.theme.borderColor }}
              />
              <Formik
                initialValues={initialValues}
                validationSchema={colorSchema}
                onSubmit={(values) => {
                  const { name } = values;
                  delete values.name;
                  dispatch({ type: "addTheme", theme: values, name });
                }}
              >
                {({ errors, touched, values }) => (
                  <Form className="w-3/4 mx-auto grid grid-cols-2 gap-4">
                    <div className="flex col-span-2 flex-col">
                      <label htmlFor="name">Name</label>
                      <Field
                        name="name"
                        className="w-64 h-8 outline-none focus:ring-1"
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: state?.theme.errorColor }}>
                          {errors.name}
                        </div>
                      ) : null}
                    </div>
                    {Object.keys(initialValues).map(
                      (key) =>
                        key !== "name" && (
                          <div
                            key={key}
                            className="flex flex-col justify-center mx-auto"
                          >
                            <label htmlFor={key} className="ml-12">
                              {key}
                            </label>
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 mr-4 ${
                                  key === "bgColor" ? "border border-black" : ""
                                } rounded-full shadow-lg`}
                                style={{
                                  backgroundColor: !errors[key]
                                    ? values[key]
                                    : "transparent",
                                }}
                              ></div>
                              <Field
                                name={key}
                                className="h-8 outline-none focus:ring-1"
                              />
                            </div>
                            {errors[key] && touched[key] ? (
                              <div style={{ color: state?.theme.errorColor }}>
                                {errors[key]}
                              </div>
                            ) : null}
                          </div>
                        )
                    )}
                    <button className="col-span-2" type="submit">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>
          <Modal open={open} setOpen={setOpen}>
            <h2 className="pb-2 text-3xl font-bold">Highlighting</h2>
            <hr
              className="w-48 mb-4 border-b"
              style={{ borderColor: state?.theme.borderColor }}
            />
            <div className="flex flex-col w-3/4 mx-auto space-y-4 divide-y">
              <Switch
                clicked={dispatch?.bind(null, { type: "highlightBlocks" })}
                checked={state?.highlightBlocks}
                label="Highlight Blocks"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: "highlightRows" })}
                checked={state?.highlightRows}
                label="Highlight Rows"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: "highlightColumns" })}
                checked={state?.highlightCols}
                label="Highlight Columns"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: "highlightSameNumbers" })}
                checked={state?.highlightSameNumbers}
                label="Highlight Same Numbers"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: "toggleErrors" })}
                checked={state?.showUserErrors}
                label="Autocheck Mistakes"
              />
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
