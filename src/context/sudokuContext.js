import React, { useReducer, useContext } from 'react';
import _ from 'lodash';

const defaultSudokuGrid = {
  notes: false,
  puzzle: [],
  complete: [],
  history: [],
  currentNum: 0,
  coords: [],
  currentBlock: undefined,
  currentIndex: undefined,
  disableHighlights: false,
  keyHit: false,
};

let historyIndex = 0;

const SudokuContext = React.createContext(defaultSudokuGrid);

function setHighlights(grid) {
  const [block, row, col, num] = grid;
  const topBlock = block <= 2;
  const middleBlock = block > 2 && block < 6;
  const bottomBlock = block > 5;
  const leftBlock = block % 3 === 0;
  const middleRowBlock = block % 3 === 1;
  const rightBlock = block % 3 === 2;

  let colBlocks = [];
  let rowBlocks = [];

  if (topBlock) colBlocks = [block + 3, block + 6];
  if (middleBlock) colBlocks = [block - 3, block + 3];
  if (bottomBlock) colBlocks = [block - 3, block - 6];
  if (leftBlock) rowBlocks = [block + 1, block + 2];
  if (middleRowBlock) rowBlocks = [block - 1, block + 1];
  if (rightBlock) rowBlocks = [block - 1, block - 2];

  return { block, row, col, num, rowBlocks, colBlocks };
}

function sudokuReducer(state, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case 'initialize':
      newState = {
        ...defaultSudokuGrid,
        ...action.data,
      };
      break;
    case 'addItem':
      newState.puzzle[newState.coords[0]][newState.coords[1]] = action.data;
      break;
    case 'removeNote':
      const removeIndex = newState.puzzle[newState.coords[0]][
        newState.coords[1]
      ]
        .sort()
        .findIndex((val) => val === action.data);
      newState.puzzle[newState.coords[0]][newState.coords[1]]
        .sort()
        .splice(removeIndex, 1);
      break;
    case 'addNote':
      newState.puzzle[newState.coords[0]][newState.coords[1]] = newState.puzzle[
        newState.coords[0]
      ][newState.coords[1]]
        .sort()
        .concat(action.data);
      break;
    case 'removeNoteEnd':
      newState.puzzle[newState.coords[0]][newState.coords[1]] = newState.puzzle[
        newState.coords[0]
      ][newState.coords[1]]
        .sort()
        .slice(0, -1);
      break;
    case 'removeNoteStart':
      newState.puzzle[newState.coords[0]][newState.coords[1]] = newState.puzzle[
        newState.coords[0]
      ][newState.coords[1]]
        .sort()
        .slice(1);
      break;
    case 'toggleNotes':
      newState = { ...state, notes: !state.notes };
      break;
    case 'removeNum':
      newState.puzzle[newState.coords[0]][newState.coords[1]] = 0;
      break;
    case 'changeNum':
      newState = {
        ...newState,
        currentNum: action.data,
        keyHit: !newState.keyHit,
      };
      break;
    case 'undo':
      if (historyIndex >= 0 && newState.history.length > 0) {
        const [grid, { from }] = newState.history[historyIndex];
        console.log(from);
        // const { block, row, col, num, rowBlocks, colBlocks } = setHighlights([
        //   ...grid,
        //   from,
        // ]);
        // historyIndex--;

        // newState.puzzle[block][row][col] = num;
        // newState.currentBlock = block;
        // newState.currentRow = row;
        // newState.currentCol = col;
        // newState.currentNum = num.number || num;
        // newState.rowBlock = rowBlocks;
        // newState.colBlock = colBlocks;
      }
      break;
    case 'redo':
      if (historyIndex + 1 < newState.history.length) {
        historyIndex++;
        const [grid, { to }] = newState.history[historyIndex];
        console.log(to);
      }
      break;
    case 'setHistory':
      if (historyIndex < newState.history.length) {
        newState.history.splice(
          historyIndex + 1,
          newState.history.length - historyIndex - 1
        );
      }
      newState.history.push([
        action.grid,
        {
          from: action.data,
          to: newState.puzzle[newState.coords[0]][newState.coords[1]],
        },
      ]);

      historyIndex = newState.history.length - 1;
      break;
    case 'setCoords':
      newState.coords = action.coords;
      newState.currentNum = newState.puzzle[action.coords[0]][action.coords[1]];
      break;
    case 'revealCell':
      newState.puzzle[newState.coords[0]][newState.coords[1]] =
        newState.complete[newState.coords[0]][newState.coords[1]];
      break;
    case 'moveGrid':
      const [block, cell] = newState.coords;
      if (
        action.key === 'ArrowRight' ||
        action.key === 'D' ||
        action.key === 'd' ||
        action.key === 'Tab' ||
        action.key === ' '
      ) {
        if (cell % 3 !== 2) newState.coords = [block, cell + 1];
        else if (cell % 3 === 2 && block % 3 !== 2)
          newState.coords = [block + 1, Math.floor(cell / 3) * 3];
        else {
          newState.coords = [
            Math.floor(block / 3) * 3,
            Math.floor(cell / 3) * 3,
          ];
        }
      }
      if (
        action.key === 'ArrowLeft' ||
        action.key === 'A' ||
        action.key === 'a'
      ) {
        if (cell % 3 !== 0) newState.coords = [block, cell - 1];
        else if (cell % 3 === 0 && block % 3 !== 0)
          newState.coords = [block - 1, Math.floor(cell / 3) * 3 + 2];
        else {
          newState.coords = [
            Math.floor(block / 3) * 3 + 2,
            Math.floor(cell / 3) * 3 + 2,
          ];
        }
      }
      if (
        action.key === 'ArrowDown' ||
        action.key === 'S' ||
        action.key === 's' ||
        action.key === 'Enter'
      ) {
        if (cell / 3 < 2) newState.coords = [block, cell + 3];
        else if (cell / 3 >= 2 && block / 3 < 2)
          newState.coords = [block + 3, cell % 3];
        else newState.coords = [block % 3, cell % 3];
      }
      if (
        action.key === 'ArrowUp' ||
        action.key === 'W' ||
        action.key === 'w'
      ) {
        if (cell / 3 > 1) newState.coords = [block, cell - 3];
        else if (cell / 3 <= 1 && block / 3 >= 1)
          newState.coords = [block - 3, cell + 6];
        else newState.coords = [(block % 3) + 6, (cell % 3) + 6];
      }
      newState.currentNum =
        newState.puzzle[newState.coords[0]][newState.coords[1]];
      break;
    case 'disableHighlights':
      newState.disableHighlights = true;
      break;
    case 'enableHighlights':
      newState.disableHighlights = false;
      break;
    default:
      throw new Error(
        `Type of ${action.type} is not an accepted type of SudokuReducer`
      );
  }
  return newState;
}

function SudokuProvider({ children }) {
  const context = useReducer(sudokuReducer, defaultSudokuGrid);
  return (
    <SudokuContext.Provider value={context}>{children}</SudokuContext.Provider>
  );
}

function useSudoku() {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error('useSudoku must be used within a SudokuProvider component');
  }
  return context;
}

export { SudokuProvider, useSudoku };
