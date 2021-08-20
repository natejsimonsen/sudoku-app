import React, { useState } from "react";
import { useUserConfig } from "../context/userConfigContext";
import { useSudoku } from "../context/sudokuContext";

const SudokuCell = ({ i, x, ...props }) => {
  const { setState } = useSudoku();
  const { state } = useUserConfig();

  const row = Math.floor(i / 3);
  const col = i % 3;

  const [sudokuNum, setSudokuNum] = useState("");

  const handleChange = (e) => {
    const newNumber = Number.parseInt(e.target.value);
    const secondNumber = Number.parseInt(String(newNumber).slice(-1));

    let newNum;

    if (!Number.isNaN(newNumber) && newNumber > 0 && secondNumber !== 0) {
      newNum = Number.parseInt(String(newNumber).slice(-1));
      setSudokuNum(newNum);
      props.setActiveNum(newNum);
    } else if (e.target.value === "") {
      newNum = 0;
      setSudokuNum("");
      props.setActiveNum(newNum);
    }

    setState((prevState) => {
      prevState.puzzle[props.block][row][col] = newNum;
      return prevState;
    });
  };

  let backgroundColor = state?.theme.bgColor;
  let sudokuNumberColor = state?.theme.color;

  if (props.number !== 0) sudokuNumberColor = state?.theme.color;
  else if (!state?.showUserErrors)
    sudokuNumberColor = state?.theme.successColor;
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

  return (
    <div
      className={`font-semibold sudoku-cell flex justify-center text-center items-center`}
      style={{
        fontSize: x / 14,
        height: x / 9,
        width: x / 9,
      }}
      data-row={Math.floor(i / 3)}
      data-column={i % 3}
      data-number={sudokuNum || props.number}
      onClick={() => {
        if (state?.notes)
          setState((prevState) => {
            prevState.puzzle[props.block][row][col] = 0;
            return prevState;
          });
      }}
    >
      <textarea
        style={{
          resize: "none",
          width: x / 9,
          height: x / 9,
          outline: "none",
          ...borderStyle,
          backgroundColor: backgroundColor,
          color: sudokuNumberColor,
          cursor: "default",
          caretColor: "transparent",
        }}
        onChange={handleChange}
        className="flex items-center text-center"
        value={props.number !== 0 ? props.number : sudokuNum}
        readOnly={props.number !== 0}
      />
    </div>
  );
};

export default SudokuCell;
