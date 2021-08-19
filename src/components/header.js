import React, { useState } from "react";
import { useUserConfig } from "../context/userConfigContext";
import { Link } from "gatsby";
import colors from "../config/colors";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import Switch from "./Switch";

const CogIcon = (props) => (
  <button onClick={props.onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>
);

const Header = () => {
  const { state, dispatch } = useUserConfig();
  const [open, setOpen] = useState(false);

  const handleClick = (theme) => {
    dispatch({ type: "changeTheme", theme: colors[theme] });
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
          <Dropdown
            onClick={handleClick}
            keys={Object.keys(colors).slice(0, -1)}
          />
          <CogIcon onClick={setOpen.bind(null, true)} />
          <Modal open={open} setOpen={setOpen}>
            <h2 className="pb-2 text-3xl font-bold">Highlighting</h2>
            <hr
              className="w-48 mb-4 border-b"
              style={{ borderColor: state?.theme.borderColor }}
            />
            <div className="flex flex-col space-y-4 divide-y w-3/4 mx-auto">
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
