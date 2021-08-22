import React, { useReducer, useContext } from "react";
import _ from "lodash";

const defaultSudokuGrid = {
  puzzle: [],
  complete: [],
  history: [],
  currentNumber: 0,
  activeBlock: null,
  activeCol: null,
  activeRow: null,
  activeNum: null,
  keyHit: false,
};

let historyIndex = 0;

const SudokuContext = React.createContext();

function sudokuReducer(state, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case "initialize":
      newState = {
        ...defaultSudokuGrid,
        ...action.data,
      };
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
      historyIndex--;
      if (historyIndex >= 0) {
        const [grid, data] = newState.history[historyIndex];
        const [block, row, col] = grid;
        if (data === 0) historyIndex--;
        newState.puzzle[block][row][col] = data;
        console.log(grid, data);
        newState.currentBlock = block;
        newState.currentRow = row;
        newState.currentCol = col;
        newState.currentNum = data.number || data;
      }
      break;
    case "redo":
      if (historyIndex < newState.history.length) {
        historyIndex++;
        if (newState.history.length !== historyIndex) {
          const [grid, data] = newState.history[historyIndex];
          const [block, row, col] = grid;
          newState.puzzle[block][row][col] = data;
          newState.currentBlock = block;
          newState.currentRow = row;
          newState.currentCol = col;
          newState.currentNum = data;
        }
      }
      break;
    case "setHistory":
      newState.history.push([
        action.grid,
        typeof action.data !== "undefined"
          ? action.data
          : newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]],
      ]);
      historyIndex = newState.history.length - 1;
      break;
    case "setHighlights":
      const [block, row, col, num] = action.data;
      newState.currentBlock = block;
      newState.currentRow = row;
      newState.currentCol = col;
      newState.currentNum = num;
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
