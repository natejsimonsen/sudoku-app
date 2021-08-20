import React from "react";
import { useUserConfig } from "../context/userConfigContext";

const SudokuToolbar = (props) => {
  const { dispatch } = useUserConfig();
  return (
    <div>
      <button
        onClick={dispatch.bind(null, { type: "toggleNotes" })}
        className="p-2 my-6 rounded-sm shadow-xl bg-gray-700"
      >
        Toggle Notes
      </button>
    </div>
  );
};

export default SudokuToolbar;
