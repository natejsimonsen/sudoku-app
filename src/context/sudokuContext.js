import React, { useReducer, useContext } from "react";
import _ from "lodash";

const defaultSudokuGrid = {
  puzzle: [],
  complete: [],
  history: [],
  currentNumber: 0,
  keyHit: false,
};

let historyIndex = 0;
let initialized = false;
let originalPuzzle;

const SudokuContext = React.createContext();

function sudokuReducer(state, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case "initialize":
      initialized = true;
      newState = {
        ...defaultSudokuGrid,
        ...action.data,
      };
      originalPuzzle = _.cloneDeep(action?.data?.puzzle);
      break;
    case "addItem":
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        action.data;
      break;
    case "removeNote":
      const removeIndex = newState.puzzle[action.grid[0]][action.grid[1]][
        action.grid[2]
      ].findIndex((val) => val === action.data);
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
        .sort()
        .splice(removeIndex, 1);
      break;
    case "addNote":
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .concat(action.data);
      break;
    case "backspace":
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .slice(0, -1);
      break;
    case "delete":
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .slice(1);
      break;
    case "changeNum":
      newState = {
        ...newState,
        currentNumber: action.data,
        keyHit: !newState.keyHit,
      };
      break;
    case "undo":
      if (newState.history.length > 0) {
        newState.history.pop();
        let puzzle = null;
        if (newState.history.length !== 0)
          puzzle = newState.history[newState.history.length - 1];
        newState = {
          ..._.cloneDeep(newState),
          puzzle: puzzle || originalPuzzle,
        };

        console.log(newState);
      }
      break;
    case "redo":
      // historyIndex++;
      console.log(historyIndex);
      // if (historyIndex < newState.history.length)
      //   newState.puzzle = newState.history[historyIndex];
      break;
    case "setHistory":
      newState.history.push(_.cloneDeep(newState.puzzle));
      historyIndex = newState.history.length;
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
    throw new Error("useSudoku must be used within a SudokuProvider component");
  }
  return context;
}

export { SudokuProvider, useSudoku };
