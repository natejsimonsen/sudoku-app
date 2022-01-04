import React from 'react';
import SudokuCell from './SudokuCell';
import SudokuLockedCell from './SudokuLockedCell';
import { useUserConfig } from '../context/userConfigContext';
import { useSudoku } from '../context/sudokuContext';
import { useNetworkState } from 'react-use';

const SudokuBlock = (props) => {
  const { state: themeState } = useUserConfig();
  const [state] = useSudoku();

  const block = props.i;
  const borderStyle = { borderRight: null, borderBottom: null };

  if (block % 3 < 2) {
    borderStyle.borderRight = `1px solid ${themeState.theme.boldBorderColor}`;
  }

  if (block < 6) {
    borderStyle.borderBottom = `1px solid ${themeState.theme.boldBorderColor}`;
  }

  return (
    <div
      className="overflow-hidden outline-none shadow-lg sudoku-block"
      style={{
        ...borderStyle,
      }}
    >
      <div className="flex items-center justify-center outline-none grid grid-cols-3 grid-rows-3">
        {props.dumb
          ? props.block.map((item, i) => (
              <SudokuLockedCell
                block={props.i}
                i={i}
                number={item}
                x={props.x}
                key={i}
              />
            ))
          : props.block.map((item, i) => {
              let highlighted = 0;
              let blockHighlighted = 0;
              let rowHighlighted = 0;
              let colHighlighted = 0;
              const number = item.number || item;

              if (
                themeState.highlightSameNumbers &&
                state.currentNum === number &&
                number !== 0
              )
                highlighted = 1;

              props.blockIndicies.forEach(([blockIndex, cellIndex]) => {
                if (block === blockIndex && i === cellIndex) {
                  if (themeState.highlightBlocks && highlighted !== 3)
                    highlighted = 1;
                  if (state.invalidNums[0].includes(number)) {
                    highlighted = 3;
                  }
                }
              });
              props.rowIndicies.forEach(([blockIndex, cellIndex]) => {
                if (block === blockIndex && i === cellIndex) {
                  if (themeState.highlightRows && highlighted !== 3)
                    highlighted = 1;
                  if (state.invalidNums[1].includes(number)) {
                    highlighted = 3;
                  }
                }
              });
              props.colIndicies.forEach(([blockIndex, cellIndex]) => {
                if (block === blockIndex && i === cellIndex) {
                  if (themeState.highlightCols && highlighted !== 3)
                    highlighted = 1;
                  if (state.invalidNums[2].includes(number)) {
                    highlighted = 3;
                  }
                }
              });

              if (state.coords[0] === block && state.coords[1] === i)
                highlighted = 2;

              return typeof item === 'object' || item === 0 ? (
                <SudokuCell
                  block={props.i}
                  highlighted={highlighted}
                  i={i}
                  number={number}
                  x={props.x}
                  key={i}
                />
              ) : (
                <SudokuLockedCell
                  block={props.i}
                  highlighted={highlighted}
                  i={i}
                  number={item}
                  x={props.x}
                  key={i}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SudokuBlock;
