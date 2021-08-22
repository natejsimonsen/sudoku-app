import React, { useState, useEffect } from "react";
import SudokuBlock from "./SudokuBlock";
import { useSudoku } from "../context/sudokuContext";
import { useKey } from "react-use";
import _ from "lodash";

const SudokuGrid = (props) => {
  const [state, dispatch] = useSudoku();
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [currentCol, setCurrentCol] = useState(null);
  const [currentNum, setCurrentNum] = useState(null);
  const [rowBlock, setRowBlock] = useState(null);
  const [colBlock, setColBlock] = useState(null);

  const acceptedKeys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "Delete",
  ];

  const keyPressHandler = (event) => {
    if (Number.isFinite(+event.key)) {
      dispatch({ type: "changeNum", data: +event.key });
    } else if (event.key === "Backspace" || event.key === "Delete") {
      dispatch({ type: "changeNum", data: event.key });
    } else {
      dispatch("these keys move the sudoku app");
    }
  };

  useKey((event) => acceptedKeys.includes(event.key), keyPressHandler);

  const handleBlockClick = (e) => {
    if (props.loading) return;

    const block = e.target.closest(".sudoku-block");
    const sudokuCell = e.target.closest(".sudoku-cell");

    const rowNum = +sudokuCell.dataset.row;
    const columnNum = +sudokuCell.dataset.column;
    const currentNumber = +sudokuCell.dataset.number;
    const blockNum = +block.dataset.block;

    const topBlock = blockNum <= 2;
    const middleBlock = blockNum > 2 && blockNum < 6;
    const bottomBlock = blockNum > 5;
    const leftBlock = blockNum % 3 === 0;
    const middleRowBlock = blockNum % 3 === 1;
    const rightBlock = blockNum % 3 === 2;

    let columnBlockIndex = [];
    let rowBlockIndex = [];

    if (topBlock) columnBlockIndex = [blockNum + 3, blockNum + 6];
    if (middleBlock) columnBlockIndex = [blockNum - 3, blockNum + 3];
    if (bottomBlock) columnBlockIndex = [blockNum - 3, blockNum - 6];
    if (leftBlock) rowBlockIndex = [blockNum + 1, blockNum + 2];
    if (middleRowBlock) rowBlockIndex = [blockNum - 1, blockNum + 1];
    if (rightBlock) rowBlockIndex = [blockNum - 1, blockNum - 2];

    setCurrentBlock(blockNum);
    setCurrentRow(rowNum);
    setCurrentCol(columnNum);
    setRowBlock(rowBlockIndex);
    setColBlock(columnBlockIndex);
    setCurrentNum(currentNumber);
  };

  // min is 320 px
  // max is none
  // best results within 400-800 px
  const sudokuGridWidth = 650;

  useEffect(() => {
    const originalData = _.cloneDeep(props.data);
    dispatch({ type: "initialize", data: originalData });
  }, [props.loading]);

  return (
    <section
      className="grid grid-cols-3 grid-rows-3"
      style={{ height: sudokuGridWidth, width: sudokuGridWidth }}
      onMouseDown={handleBlockClick}
      id="sudokuGrid"
    >
      {(!state || !state.puzzle || state?.puzzle?.length === 0) &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
          <SudokuBlock
            dumb
            x={sudokuGridWidth}
            key={item}
            i={i}
            block={[0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
        ))}
      {state?.puzzle?.map((block, i) => (
        <SudokuBlock
          completeBlock={props.data?.complete[i]}
          currentBlock={currentBlock}
          currentRow={currentRow}
          currentCol={currentCol}
          rowBlock={rowBlock}
          currentNum={currentNum}
          setActiveNum={setCurrentNum}
          colBlock={colBlock}
          key={i}
          block={block}
          x={sudokuGridWidth}
          i={i}
        />
      ))}
    </section>
  );
};

export default SudokuGrid;
