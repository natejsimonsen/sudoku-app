import React from 'react';
import { useUserConfig } from '../context/userConfigContext';
import { useSudoku } from '../context/sudokuContext';
import _ from 'lodash';

const SudokuCell = ({ i, x, ...props }) => {
  const { state } = useUserConfig();
  const { state: sudokuState, setState } = useSudoku();

  const row = Math.floor(i / 3);
  const col = i % 3;

  let backgroundColor = state.theme.bgColor;

  if (
    props.currentBlock === props.block &&
    props.currentRow === row &&
    props.currentCol === col
  ) {
    backgroundColor = state.theme.darkerHighlightBg;
  } else if (props.currentBlock === props.block && state.highlightBlocks) {
    backgroundColor = state.theme.highlightBgColor;
  } else if (
    props.colBlock?.includes(props.block) &&
    props.currentCol === col &&
    state.highlightCols
  ) {
    backgroundColor = state.theme.highlightBgColor;
  } else if (
    props.rowBlock?.includes(props.block) &&
    props.currentRow === row &&
    state.highlightRows
  ) {
    backgroundColor = state.theme.highlightBgColor;
  } else if (
    props.currentBlock === props.block &&
    state.highlightCols &&
    col === props.currentCol
  ) {
    backgroundColor = state.theme.highlightBgColor;
  } else if (
    props.currentBlock === props.block &&
    state.highlightRows &&
    row === props.currentRow
  ) {
    backgroundColor = state.theme.highlightBgColor;
  }

  const borderStyle = {
    borderRight: `1px solid ${state.theme.borderColor}`,
    borderBottom: `1px solid ${state.theme.borderColor}`,
  };
  if (row === 0 && props.block < 3)
    borderStyle.borderTop = `1px solid ${state.theme.borderColor}`;
  if (row === 0 && props.block >= 3)
    borderStyle.borderTop = `1px solid ${state.theme.boldBorderColor}`;
  if (col === 0 && props.block % 3 === 0)
    borderStyle.borderLeft = `1px solid ${state.theme.borderColor}`;
  if (col === 0 && props.block % 3 !== 0) {
    borderStyle.borderLeft = `1px solid ${state.theme.boldBorderColor}`;
  }

  const handleKeyEvent = (e) => {
    const key = +e.key;

    let newState = _.cloneDeep(sudokuState);

    if (props.items === 0 && Number.isFinite(key) && key > 0) {
      newState.puzzle[props.block][row][col] = [key];
    } else if (props.items.includes(key)) {
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

    if (props.items.length > 0 && e.key === 'Backspace')
      newState.puzzle[props.block][row][col] = newState.puzzle[props.block][
        row
      ][col]
        .sort()
        .slice(0, -1);
    else if (props.items.length > 0 && e.key === 'Delete')
      newState.puzzle[props.block][row][col] = newState.puzzle[props.block][
        row
      ][col]
        .sort()
        .slice(1);

    if (newState.puzzle[props.block][row][col].length === 0)
      newState.puzzle[props.block][row][col] = 0;

    if (!state.notes) newState.puzzle[props.block][row][col] = { number: key };

    setState(newState);
  };

  return (
    <div
      className={``}
      style={{
        fontSize: x / (14 * 3),
        height: x / 9,
        width: x / 9,
        outline: 'none',
        ...borderStyle,
        backgroundColor,
      }}
      data-row={Math.floor(i / 3)}
      data-column={i % 3}
      data-number={0}
      tabIndex={0}
      onKeyDown={handleKeyEvent}
    >
      {props.items !== 0 &&
        props.items.map((note) => (
          <p
            key={note}
            style={{
              gridRowStart: Math.floor((note - 1) / 3 + 1),
              gridColumnStart: Math.floor(((note - 1) % 3) + 1),
            }}
          >
            {note}
          </p>
        ))}
    </div>
  );
};

export default SudokuCell;
