import React, { useState } from "react";
import { useUserConfig } from "../context/userConfigContext";
import { useSudoku } from "../context/sudokuContext";
import _ from "lodash";

const SudokuCell = ({ i, x, ...props }) => {
  const { state: sudokuState, setState } = useSudoku();
  const { state } = useUserConfig();

  const row = Math.floor(i / 3);
  const col = i % 3;

  const [sudokuNum, setSudokuNum] = useState("");

  const handleChange = (e) => {
    const key = +e.key;
    let newNum;
    let newState = _.cloneDeep(sudokuState);

    if (!state?.notes) {
      if (!Number.isNaN(key) && key > 0) {
        newNum = key;
        setSudokuNum(key);
        props.setActiveNum(key);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        newNum = 0;
        setSudokuNum("");
        props.setActiveNum(newNum);
      }

      if (newNum === 0) newState.puzzle[props.block][row][col] = 0;
      else newState.puzzle[props.block][row][col] = { number: newNum };
    } else {
      if (
        (!Array.isArray(props.number) || props.number === 0) &&
        Number.isFinite(key) &&
        key > 0
      ) {
        newState.puzzle[props.block][row][col] = [key];
      } else if (props.number.includes(key)) {
        const removeIndex = newState.puzzle[props.block][row][col].findIndex(
          (val) => val === key
        );
        newState.puzzle[props.block][row][col].sort().splice(removeIndex, 1);
      } else if (Number.isFinite(key) && key > 0) {
        newState.puzzle[props.block][row][col] = newState.puzzle[props.block][
          row
        ][col]
          .sort()
          .concat(key);
      }

      if (props.number.length > 0 && e.key === "Backspace")
        newState.puzzle[props.block][row][col] = newState.puzzle[props.block][
          row
        ][col]
          .sort()
          .slice(0, -1);
      else if (props.number.length > 0 && e.key === "Delete")
        newState.puzzle[props.block][row][col] = newState.puzzle[props.block][
          row
        ][col]
          .sort()
          .slice(1);

      if (newState.puzzle[props.block][row][col].length === 0)
        newState.puzzle[props.block][row][col] = [];
      props.setActiveNum(0);
      setSudokuNum("");
    }
    setState(newState);
  };

  let backgroundColor = state?.theme.bgColor;
  let sudokuNumberColor = state?.theme.color;

  if (!state?.showUserErrors)
    sudokuNumberColor = state?.theme.userSudokuNumColor;
  else if (props.correctNumber === +sudokuNum)
    sudokuNumberColor = state?.theme.successColor;
  else if (!sudokuNum) sudokuNumberColor = state?.theme.color;
  else sudokuNumberColor = state?.theme.errorColor;

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
    props.activeNum !== 0 &&
    (props.number !== 0 || sudokuNum) &&
    (props.number === props.activeNum || sudokuNum === props.activeNum) &&
    state?.highlightSameNumbers
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

  const normalModeClass =
    "sudoku-cell font-semibold flex justify-center text-center items-center";
  const notesModeClass =
    "font-semibold text-center sudoku-cell grid grid-cols-3 grid-rows-3 flex justify-center items-center";

  return (
    <div
      className={
        !Array.isArray(props.number) ? normalModeClass : notesModeClass
      }
      style={{
        fontSize: !Array.isArray(props.number) ? x / 14 : x / 42,
        height: x / 9,
        width: x / 9,
        outline: "none",
        ...borderStyle,
        backgroundColor,
        color: !Array.isArray(props.number)
          ? sudokuNumberColor
          : state?.theme.color,
      }}
      data-row={row}
      data-column={col}
      data-number={sudokuNum || props.number}
      tabIndex={0}
      onKeyDown={handleChange}
    >
      {!Array.isArray(props.number) ? (
        <p>{props.number !== 0 ? props.number : sudokuNum}</p>
      ) : (
        <>
          {props.number.map((note) => (
            <p
              key={note}
              className={`row-start-${
                Math.floor((note - 1) / 3) + 1
              } col-start-${((note - 1) % 3) + 1}`}
            >
              {note}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default SudokuCell;
