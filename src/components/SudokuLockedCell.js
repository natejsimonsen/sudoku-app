import React from 'react';
import { useUserConfig } from '../context/userConfigContext';
import { useSudoku } from '../context/sudokuContext';

const SudokuLockedCell = ({ i, x, ...props }) => {
  const { state } = useUserConfig();
  const [sudokuState, dispatch] = useSudoku();

  let backgroundColor = state.theme.bgColor;
  let sudokuNumberColor = state.theme.color;

  if (props.number !== 0) sudokuNumberColor = state.theme.color;
  else if (!state.showUserErrors) sudokuNumberColor = state.theme.successColor;
  else sudokuNumberColor = state.theme.errorColor;

  if (props.highlighted === 1) backgroundColor = state.theme.highlightBgColor;
  else if (props.highlighted === 2) {
    backgroundColor = state.theme.darkerHighlightBg;
  }

  const borderStyle = {};

  // borders work ok for now
  if (i % 3 < 2) {
    borderStyle.borderRight = `1px solid ${state.theme.borderColor}`;
  }

  if (i < 6) {
    borderStyle.borderBottom = `1px solid ${state.theme.borderColor}`;
  }

  return (
    <div
      className={`font-semibold sudoku-cell flex justify-center text-center items-center`}
      onClick={() => {
        dispatch({ type: 'setCoords', coords: [props.block, i] });
      }}
      style={{
        fontSize: x / 14,
        height: x / 9,
        width: x / 9,
        outline: `1px solid ${state.theme.borderColor}`,
        backgroundColor: sudokuState.disableHighlights
          ? state.theme.bgColor
          : backgroundColor,
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
