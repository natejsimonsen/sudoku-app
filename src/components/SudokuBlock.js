import React from "react";
import SudokuNotesCell from "./SudokuNotesCell";
import SudokuCell from "./SudokuCell";
import { useUserConfig } from "../context/userConfigContext";
import { useSudoku } from "../context/sudokuContext";

const SudokuBlock = ({ loading, ...props }) => {
  const { state } = useUserConfig();
  const { state: sudokuState } = useSudoku();
  return (
    <div className="shadow-lg sudoku-block" data-block={props.i}>
      <div className="flex items-center justify-center grid grid-cols-3 grid-rows-3">
        {!loading &&
          props.block
            .flat()
            .map((item, i) =>
              !state?.notes ||
              sudokuState?.puzzle[props.i][Math.floor(i / 3)][i % 3] !== 0 ? (
                <SudokuCell
                  correctNumber={props.completeBlock.flat()[i]}
                  currentBlock={props.currentBlock}
                  currentRow={props.currentRow}
                  currentCol={props.currentCol}
                  activeNum={props.currentNum}
                  rowBlock={props.rowBlock}
                  colBlock={props.colBlock}
                  block={props.i}
                  setActiveNum={props.setActiveNum}
                  i={i}
                  number={item}
                  x={props.x}
                  key={i}
                />
              ) : (
                <SudokuNotesCell
                  correctNumber={props.completeBlock.flat()[i]}
                  currentBlock={props.currentBlock}
                  currentRow={props.currentRow}
                  currentCol={props.currentCol}
                  activeNum={props.currentNum}
                  rowBlock={props.rowBlock}
                  colBlock={props.colBlock}
                  block={props.i}
                  setActiveNum={props.setActiveNum}
                  i={i}
                  number={item}
                  x={props.x}
                  key={i}
                />
              )
            )}
      </div>
    </div>
  );
};

export default SudokuBlock;
