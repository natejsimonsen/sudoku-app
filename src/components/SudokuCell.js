import React, { useState, useEffect } from "react";
import { useUserConfig } from "../context/userConfigContext";
import { useSudoku } from "../context/sudokuContext";
import _ from "lodash";

const SudokuCell = ({ i, x, ...props }) => {
  const [sudokuState, dispatch] = useSudoku();
  const { state } = useUserConfig();

  const row = Math.floor(i / 3);
  const col = i % 3;
  const { block } = props;

  useEffect(() => {
    if (
      props.currentBlock === block &&
      props.currentRow === row &&
      props.currentCol === col
    ) {
      const key = sudokuState.currentNumber;
      let newState;

      if (!state?.notes) {
        if (!Number.isNaN(key) && key > 0) {
          newState = key;
          props.setActiveNum(key);
        } else if (key === "Backspace" || key === "Delete") {
          newState = 0;
          props.setActiveNum(newState);
        }

        if (newState === 0)
          dispatch({
            type: "addItem",
            data: 0,
            grid: [block, row, col],
          });
        else
          dispatch({
            type: "addItem",
            data: { number: newState },
            grid: [block, row, col],
          });
      } else {
        if (
          (!Array.isArray(props.number) || props.number === 0) &&
          Number.isFinite(key) &&
          key > 0
        ) {
          dispatch({
            type: "addItem",
            data: [key],
            grid: [block, row, col],
          });
        } else if (Array.isArray(props.number) && props.number.includes(key)) {
          dispatch({
            type: "removeNote",
            data: key,
            grid: [block, row, col],
          });
        } else if (Number.isFinite(key) && key > 0) {
          dispatch({
            type: "addNote",
            data: key,
            grid: [block, row, col],
          });
        }

        if (props.number.length > 0 && key === "Backspace")
          dispatch({
            type: "backspace",
            grid: [block, row, col],
          });
        else if (props.number.length > 0 && key === "Delete")
          dispatch({
            type: "delete",
            grid: [block, row, col],
          });

        props.setActiveNum(0);
      }
      dispatch({
        type: "setHistory",
      });
    }
  }, [sudokuState.keyHit]);

  let backgroundColor = state?.theme.bgColor;
  let sudokuNumberColor = state?.theme.color;

  if (!state?.showUserErrors)
    sudokuNumberColor = state?.theme.userSudokuNumColor;
  else if (props.correctNumber === props.number)
    sudokuNumberColor = state?.theme.successColor;
  // else if (!sudokuNum) sudokuNumberColor = state?.theme.color;
  else sudokuNumberColor = state?.theme.errorColor;

  if (
    props.currentBlock === block &&
    props.currentRow === row &&
    props.currentCol === col
  ) {
    console.log(props.number);
  }

  if (
    props.currentBlock === block &&
    props.currentRow === row &&
    props.currentCol === col
  ) {
    backgroundColor = state?.theme.darkerHighlightBg;
  } else if (props.currentBlock === block && state?.highlightBlocks) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.colBlock?.includes(block) &&
    props.currentCol === col &&
    state?.highlightCols
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.rowBlock?.includes(block) &&
    props.currentRow === row &&
    state?.highlightRows
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.activeNum !== 0 &&
    props.number !== 0 &&
    props.number === props.activeNum &&
    state?.highlightSameNumbers
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.currentBlock === block &&
    state?.highlightCols &&
    col === props.currentCol
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.currentBlock === block &&
    state?.highlightRows &&
    row === props.currentRow
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  }

  const borderStyle = {
    borderRight: `1px solid ${state?.theme.borderColor}`,
    borderBottom: `1px solid ${state?.theme.borderColor}`,
  };
  if (row === 0 && block < 3)
    borderStyle.borderTop = `1px solid ${state?.theme.borderColor}`;
  if (row === 0 && block >= 3)
    borderStyle.borderTop = `1px solid ${state?.theme.boldBorderColor}`;
  if (col === 0 && block % 3 === 0)
    borderStyle.borderLeft = `1px solid ${state?.theme.borderColor}`;
  if (col === 0 && block % 3 !== 0) {
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
      data-number={props.number}
    >
      {!Array.isArray(props.number) ? (
        <p>{props.number !== 0 && props.number}</p>
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
