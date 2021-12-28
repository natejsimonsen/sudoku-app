import React, { useReducer, useContext } from 'react';
import _ from 'lodash';

const defaultSudokuGrid = {
  notes: false,
  puzzle: [],
  complete: [],
  history: [],
  currentNum: 0,
  currentBlock: undefined,
  currentRow: undefined,
  currentCol: undefined,
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
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        action.data;
      break;
    case 'removeNote':
      const removeIndex = newState.puzzle[action.grid[0]][action.grid[1]][
        action.grid[2]
      ]
        .sort()
        .findIndex((val) => val === action.data);
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
        .sort()
        .splice(removeIndex, 1);
      break;
    case 'addNote':
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .concat(action.data);
      break;
    case 'removeNoteEnd':
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .slice(0, -1);
      break;
    case 'removeNoteStart':
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] =
        newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]]
          .sort()
          .slice(1);
      break;
    case 'toggleNotes':
      newState = { ...state, notes: !state.notes };
      break;
    case 'removeNum':
      newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]] = 0;
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
        const { block, row, col, num, rowBlocks, colBlocks } = setHighlights([
          ...grid,
          from,
        ]);
        historyIndex--;

        newState.puzzle[block][row][col] = num;
        newState.currentBlock = block;
        newState.currentRow = row;
        newState.currentCol = col;
        newState.currentNum = num.number || num;
        newState.rowBlock = rowBlocks;
        newState.colBlock = colBlocks;
      }
      break;
    case 'redo':
      if (historyIndex + 1 < newState.history.length) {
        historyIndex++;
        const [grid, { to }] = newState.history[historyIndex];
        const { block, row, col, num, rowBlocks, colBlocks } = setHighlights([
          ...grid,
          to,
        ]);

        newState.puzzle[block][row][col] = num;
        newState.currentBlock = block;
        newState.currentRow = row;
        newState.currentCol = col;
        newState.currentNum = num.number || num;
        newState.rowBlock = rowBlocks;
        newState.colBlock = colBlocks;
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
          to: newState.puzzle[action.grid[0]][action.grid[1]][action.grid[2]],
        },
      ]);

      historyIndex = newState.history.length - 1;
      break;
    case 'setHighlights':
      const { block, row, col, num, rowBlocks, colBlocks } = setHighlights(
        action.grid
      );

      newState.currentBlock = block;
      newState.currentRow = row;
      newState.currentCol = col;
      newState.currentNum = num;
      newState.rowBlock = rowBlocks;
      newState.colBlock = colBlocks;

      break;
    case 'revealCell':
      newState.puzzle[newState.currentBlock][newState.currentRow][
        newState.currentCol
      ] =
        newState.complete[newState.currentBlock][newState.currentRow][
          newState.currentCol
        ];
      break;
    case 'moveGrid':
      const { currentBlock, currentCol, currentRow } = newState;
      if (typeof currentBlock !== 'undefined') {
        let newBlock = currentBlock;
        let newRow = currentRow;
        let newCol = currentCol;
        if (
          action.key === 'ArrowRight' ||
          action.key === 'D' ||
          action.key === 'd' ||
          action.key === 'Tab' ||
          action.key === ' '
        ) {
          if (currentCol === 2 && currentBlock % 3 === 2) {
            newCol = 0;
            newBlock = currentBlock - 2;
          } else if (currentCol === 2) {
            newCol = 0;
            newBlock = currentBlock + 1;
          } else {
            newCol = currentCol + 1;
          }
        }
        if (
          action.key === 'ArrowLeft' ||
          action.key === 'A' ||
          action.key === 'a'
        ) {
          if (currentBlock % 3 === 0 && currentCol === 0) {
            newBlock = currentBlock + 2;
            newCol = 2;
          } else if (currentCol === 0) {
            newCol = 2;
            newBlock = currentBlock - 1;
          } else {
            newCol = currentCol - 1;
          }
        }
        if (
          action.key === 'ArrowDown' ||
          action.key === 'S' ||
          action.key === 's' ||
          action.key === 'Enter'
        ) {
          if (currentRow === 2 && currentBlock > 5) {
            newRow = 0;
            newBlock = currentBlock - 6;
          } else if (currentRow === 2) {
            newRow = 0;
            newBlock = currentBlock + 3;
          } else {
            newRow = currentRow + 1;
          }
        }
        if (
          action.key === 'ArrowUp' ||
          action.key === 'W' ||
          action.key === 'w'
        ) {
          if (currentRow === 0 && currentBlock < 3) {
            newRow = 2;
            newBlock = currentBlock + 6;
          } else if (currentRow === 0) {
            newRow = 2;
            newBlock = currentBlock - 3;
          } else {
            newRow = currentRow - 1;
          }
        }

        // for some reason says block is already defined so rename variables
        const {
          block: b,
          row: ro,
          col: co,
          num: n,
          rowBlocks: r,
          colBlocks: c,
        } = setHighlights([
          newBlock,
          newRow,
          newCol,
          newState.puzzle[newBlock][newRow][newCol],
        ]);

        newState.currentBlock = b;
        newState.currentRow = ro;
        newState.currentCol = co;
        newState.currentNum = n.number || n;
        newState.rowBlock = r;
        newState.colBlock = c;
      }
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
