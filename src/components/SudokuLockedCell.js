import React from "react";
import { useUserConfig } from "../context/userConfigContext";
import { useSudoku } from "../context/sudokuContext";

const SudokuLockedCell = ({ i, x, ...props }) => {
  const { state } = useUserConfig();
  const [sudokuState] = useSudoku();

  const row = Math.floor(i / 3);
  const col = i % 3;

  let backgroundColor = state?.theme.bgColor;
  let sudokuNumberColor = state?.theme.color;

  if (props.number !== 0) sudokuNumberColor = state?.theme.color;
  else if (!state?.showUserErrors)
    sudokuNumberColor = state?.theme.successColor;
  else sudokuNumberColor = state?.theme.errorColor;

  if (
    sudokuState.currentBlock === props.block &&
    sudokuState.currentRow === row &&
    sudokuState.currentCol === col
  ) {
    backgroundColor = state?.theme.darkerHighlightBg;
  } else if (
    sudokuState.currentBlock === props.block &&
    state?.highlightBlocks
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.colBlock?.includes(props.block) &&
    sudokuState.currentCol === col &&
    state?.highlightCols
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    props.rowBlock?.includes(props.block) &&
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
    sudokuState.currentBlock === props.block &&
    state?.highlightCols &&
    col === sudokuState.currentCol
  ) {
    backgroundColor = state?.theme.highlightBgColor;
  } else if (
    sudokuState.currentBlock === props.block &&
    state?.highlightRows &&
    row === sudokuState.currentRow
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
        ...borderStyle,
        backgroundColor: backgroundColor,
        color: sudokuNumberColor,
      }}
      data-row={Math.floor(i / 3)}
      data-column={i % 3}
      data-number={props.number}
    >
      {props.number !== 0 && (
        <p className="flex items-center text-center">{props.number}</p>
      )}
    </div>
  );
};

export default SudokuLockedCell;
