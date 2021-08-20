import React, { useState } from "react";
import { useUserConfig } from "../context/userConfigContext";

const SudokuCell = ({ i, x, ...props }) => {
  const [notes, setNotes] = useState([]);
  const { state } = useUserConfig();
  const row = Math.floor(i / 3);
  const col = i % 3;

  let backgroundColor = state?.theme.bgColor;

  if (
    props.currentBlock === props.block &&
    props.currentRow === row &&
    props.currentCol === col
  ) {
    backgroundColor = state?.theme.darkerHighlightBg;
  } else if (props.currentBlock === props.block && state?.highlightBlocks) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.colBlock?.includes(props.block) &&
    props.currentCol === col &&
    state?.highlightCols
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.rowBlock?.includes(props.block) &&
    props.currentRow === row &&
    state?.highlightRows
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.currentBlock === props.block &&
    state?.highlightCols &&
    col === props.currentCol
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.currentBlock === props.block &&
    state?.highlightRows &&
    row === props.currentRow
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  }

  const borderStyle = {
    borderRight: `1px solid ${state?.theme.borderColor}`,
    borderBottom: `1px solid ${state?.theme.borderColor}`,
  };
  if (row === 0 && props.block < 3)
    borderStyle.borderTop = `1px solid ${state?.theme.borderColor}`;
  if (row === 0 && props.block >= 3)
    borderStyle.borderTop = `1px solid ${state?.theme.boldBorderColor}`;
  if (col === 0 && props.block % 3 === 0)
    borderStyle.borderLeft = `1px solid ${state?.theme.borderColor}`;
  if (col === 0 && props.block % 3 !== 0) {
    borderStyle.borderLeft = `1px solid ${state?.theme.boldBorderColor}`;
  }

  const handleKeyEvent = (e) => {
    if (notes.length > 0 && e.key === "Backspace")
      return setNotes((prevState) => prevState.sort().slice(0, -1));
    if (notes.length > 0 && e.key === "Delete")
      return setNotes((prevState) => prevState.sort().slice(1));
    const key = +e.key;
    if (Number.isNaN(key)) return;
    if (notes.includes(key))
      setNotes((prevState) => {
        const removeIndex = prevState.findIndex((val) => val === key);
        const newState = [...prevState];
        newState.sort().splice(removeIndex, 1);
        return newState;
      });
    else if (Number.isFinite(key) && key > 0)
      setNotes((prevState) => prevState.sort().concat(key));
  };

  return (
    <div
      className={`font-semibold text-center sudoku-cell grid grid-cols-3 grid-rows-3`}
      style={{
        fontSize: x / (14 * 3),
        height: x / 9,
        ...borderStyle,
        backgroundColor,
        outline: "none",
        width: x / 9,
      }}
      data-row={Math.floor(i / 3)}
      data-column={i % 3}
      data-number={0}
      tabIndex={0}
      onKeyDown={handleKeyEvent}
    >
      {notes.map((note) => (
        <p
          key={note}
          className={`row-start-${Math.floor((note - 1) / 3) + 1} col-start-${
            ((note - 1) % 3) + 1
          }`}
        >
          {note}
        </p>
      ))}
    </div>
  );
};

export default SudokuCell;
