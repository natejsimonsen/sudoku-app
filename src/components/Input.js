import React, { useState } from 'react';
import Popup from './Popup';
import { Field } from 'formik';
import { useUserConfig } from '../context/userConfigContext';

export default function Input(props) {
  const { state: userState } = useUserConfig();
  const [focused, setFocused] = useState(false);
  const { id, errors, values, state, touched } = props;

  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className="flex">
        {/* <Popup> */}
        {/*   <div */}
        {/*     style={{ */}
        {/*       backgroundColor: userState?.theme.navBgColor, */}
        {/*       color: userState?.theme.color, */}
        {/*     }} */}
        {/*     className="px-4 py-2" */}
        {/*   > */}
        {/*     <p style={{ maxWidth: 250 }}>{props.description}</p> */}
        {/*   </div> */}
        {/* </Popup> */}
        <label htmlFor={id} className="ml-12">
          {props.name}
        </label>
      </div>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 mr-4 ${
            id === 'bgColor' ? 'border border-black' : ''
          } rounded-full shadow-lg`}
          style={{
            backgroundColor: !errors[id] ? values[id] : 'transparent',
          }}
        ></div>
        <div
          className="relative"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <Field
            name={id}
            className="py-1 shadow-md px-2 border-2 w-52 rounded-md outline-none"
            style={{
              borderColor: focused ? state.theme.color : 'transparent',
              backgroundColor: state.theme.navBgColor,
            }}
          />
          <Popup
            className="absolute"
            style={{
              top: '50%',
              right: '4px',
              transform: 'translateY(-50%)',
            }}
          >
            <div
              style={{
                backgroundColor: userState?.theme.navBgColor,
                color: userState?.theme.color,
              }}
              className="px-4 py-2"
            >
              <p style={{ maxWidth: 250 }}>{props.description}</p>
            </div>
          </Popup>
        </div>
      </div>
      {errors[id] && touched[id] ? (
        <div style={{ color: state.theme.errorColor }}>{errors[id]}</div>
      ) : null}
    </div>
  );
}