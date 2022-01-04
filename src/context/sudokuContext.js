import React, { useReducer, useContext } from 'react';
import { getBlockRowColNums } from '../utils/sudokuHelpers';
import _ from 'lodash';

const defaultSudokuGrid = {
  notes: false,
  puzzle: [],
  complete: [],
  history: [],
  currentNum: 0,
  invalidNums: [],
  coords: [],
  currentBlock: undefined,
  currentIndex: undefined,
  disableHighlights: false,
  keyHit: false,
};

const checkErrors = (grid, coords) => {
  const removeDuplicatsAndZeros = (arr) => {
    const errorNums = [];
    const newArr = arr.reduce((acc, val) => {
      if (val === 0) return acc;
      return acc.concat(val.number || val);
    }, []);
    newArr.forEach((num) => {
      if (newArr.filter((val) => val === num).length > 1) errorNums.push(num);
    });
    return errorNums;
  };

  if (coords.length === 0) return [];
  const { row, col, block } = getBlockRowColNums(grid, coords);
  return [
    removeDuplicatsAndZeros(block),
    removeDuplicatsAndZeros(row),
    removeDuplicatsAndZeros(col),
  ];
};

let historyIndex = 0;
const SudokuContext = React.createContext(defaultSudokuGrid);

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
        const [coords, { from }] = newState.history[historyIndex];
        newState.coords = coords;
        newState.puzzle[coords[0]][coords[1]] = from;
        historyIndex -= 1;
      }
      break;
    case 'redo':
      if (historyIndex + 1 < newState.history.length) {
        historyIndex++;
        const [coords, { to }] = newState.history[historyIndex];
        newState.coords = coords;
        newState.puzzle[coords[0]][coords[1]] = to;
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
        newState.coords,
        {
          from: action.data,
          to: newState.puzzle[newState.coords[0]][newState.coords[1]],
        },
      ]);

      historyIndex = newState.history.length - 1;
      break;
    case 'setCoords':
      const newNum =
        newState.puzzle[action.coords[0]][action.coords[1]].number ||
        newState.puzzle[action.coords[0]][action.coords[1]];
      newState.coords = action.coords;
      newState.currentNum = newNum;
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
        if (cell / 3 >= 1) newState.coords = [block, cell - 3];
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
  const errors = checkErrors(newState.puzzle, newState.coords);
  newState.invalidNums = errors;
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
