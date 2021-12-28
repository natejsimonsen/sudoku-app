import React, { useEffect } from "react";
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
    const key = sudokuState.currentNum;

    if (
      sudokuState.currentBlock === block &&
      sudokuState.currentRow === row &&
      sudokuState.currentCol === col &&
      sudokuState.currentNum
    ) {
      let newState;

      if (!sudokuState?.notes) {
        if (!Number.isNaN(key) && key > 0) {
          newState = key;
          dispatch({ type: "setHighlights", grid: [block, row, col, key] });
        } else if (key === "Backspace" || key === "Delete") {
          newState = 0;
          dispatch({
            type: "setHighlights",
            grid: [block, row, col, newState],
          });
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
            type: "removeNoteEnd",
            grid: [block, row, col],
          });
        else if (props.number.length > 0 && key === "Delete")
          dispatch({
            type: "removeNoteStart",
            grid: [block, row, col],
          });
        else if (key === "Backspace" || key === "Delete")
          dispatch({ type: "removeNum", grid: [block, row, col] });

        dispatch({ type: "setHighlights", grid: [block, row, col, 0] });
      }
      dispatch({
        type: "setHistory",
        data:
          props.number && Number.isFinite(props.number)
            ? { number: props.number }
            : props.number,
        grid: [block, row, col],
      });
    }
  }, [sudokuState.keyHit]);

  let backgroundColor = state?.theme.bgColor;
  let sudokuNumberColor = state?.theme.color;

  if (!state?.showUserErrors)
    sudokuNumberColor = state?.theme.userSudokuNumColor;
  else if (props.correctNumber === props.number)
    sudokuNumberColor = state?.theme.successColor;
  else sudokuNumberColor = state?.theme.errorColor;

  if (
    sudokuState.currentBlock === block &&
    sudokuState.currentRow === row &&
    sudokuState.currentCol === col
  ) {
    backgroundColor = state?.theme.darkerHighlightBg;
  } else if (sudokuState.currentBlock === block && state?.highlightBlocks) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.colBlock?.includes(block) &&
    sudokuState.currentCol === col &&
    state?.highlightCols
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.rowBlock?.includes(block) &&
    sudokuState.currentRow === row &&
    state?.highlightRows
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.currentNum !== 0 &&
    props.number !== 0 &&
    props.number === sudokuState.currentNum &&
    state?.highlightSameNumbers
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.currentBlock === block &&
    state?.highlightCols &&
    col === sudokuState.currentCol
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.currentBlock === block &&
    state?.highlightRows &&
    row === sudokuState.currentRow
  ) {
    backgroundColor = state?.theme.highlightBgColor;
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
        outline: `1px solid ${state?.theme.borderColor}`,
        backgroundColor: sudokuState.disableHighlights
          ? state?.theme.bgColor
          : backgroundColor,
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
              style={{
                backgroundColor:
                  sudokuState.currentNum === note
                    ? state.theme.darkerHighlightBg
                    : "transparent",
              }}
              className={`rounded-full row-start-${
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
