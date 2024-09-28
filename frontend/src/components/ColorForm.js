import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useUserConfig } from '../context/userConfigContext';
import ColorBlobs from './ColorBlobs';
import Input from './Input';

const colorUIMapping = {
  color: {
    description: 'The color of the text',
    name: 'Color',
  },
  bgColor: {
    description: 'Main background color of the app',
    name: 'Background Color',
  },
  navBgColor: {
    description: 'Color of the navigation bar',
    name: 'Navigation Bar Color',
  },
  borderColor: {
    description: 'Border color of the grid',
    name: 'Border Color',
  },
  boldBorderColor: {
    description: 'Emphasized border color between blocks of the grid',
    name: 'Emphasized Border Color',
  },
  highlightBgColor: {
    description: 'Color of highlighted cells',
    name: 'Highlight Color',
  },
  darkerHighlightBg: {
    description: 'Color of the current cell',
    name: 'Emphasized Highlight Color',
  },
  successColor: {
    description: 'Color of the text to use when a sudoku number is correct',
    name: 'Success Color',
  },
  errorColor: {
    description: 'Color of the text to use when a sudoku number is incorrect',
    name: 'Error Color',
  },
  userSudokuNumColor: {
    description: 'Color of the text when the user turns off error checking',
    name: 'Autocheck Off Text Color',
  },
};

const colorSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name is too Short')
    .max(50, 'Name is too long')
    .required('Required'),
  color: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  navBgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  bgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  borderColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  boldBorderColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  highlightBgColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  darkerHighlightBg: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  successColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  errorColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
  userSudokuNumColor: Yup.string()
    .trim()
    .matches(
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/gi,
      'Not a valid color'
    )
    .required('Required'),
});

export default function ColorForm() {
  const { state, dispatch } = useUserConfig();
  const [focused, setFocused] = useState(false);

  return (
    <div className="pt-2">
      <ColorBlobs />
      <Formik
        initialValues={state.theme}
        validationSchema={colorSchema}
        enableReinitialize
        onSubmit={(values) => {
          const { name } = values;
          delete values.name;
          dispatch({ type: 'addTheme', theme: values, name });
          dispatch({ type: 'changeTheme', name });
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="w-4/5 mx-auto grid grid-cols-2 gap-4">
            <div className="flex flex-col col-span-1 mx-auto">
              <div
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex flex-col w-64"
              >
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  className="py-1 px-2 shadow-md border-2 rounded-md outline-none"
                  placeholder={state.nameOfTheme}
                  style={{
                    borderColor: focused ? state.theme.color : 'transparent',
                    backgroundColor: state.theme.navBgColor,
                  }}
                />
              </div>
              {errors.name && touched.name ? (
                <div style={{ color: state.theme.errorColor }}>
                  {errors.name}
                </div>
              ) : null}
            </div>
            <div></div>
            {Object.keys(state.theme).map(
              (key) =>
                key !== 'name' &&
                key !== 'errorBgColor' && (
                  <Input
                    key={key}
                    description={colorUIMapping[key].description}
                    name={colorUIMapping[key].name}
                    errors={errors}
                    values={values}
                    state={state}
                    touched={touched}
                    id={key}
                  />
                )
            )}
            <button
              className="col-span-2 flex mx-auto my-4 py-2 px-4 rounded-lg hover:opacity-50 transition duration-200 ease-out"
              style={{
                backgroundColor: state.theme.color,
                color: state.theme.bgColor,
              }}
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
