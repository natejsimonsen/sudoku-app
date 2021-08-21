import React from "react";
import SudokuCell from "./SudokuCell";
import SudokuLockedCell from "./SudokuLockedCell";

const SudokuBlock = ({ loading, ...props }) => {
  return (
    <div className="shadow-lg sudoku-block" data-block={props.i}>
      <div className="flex items-center justify-center grid grid-cols-3 grid-rows-3">
        {!loading &&
          props.block
            .flat()
            .map((item, i) =>
              typeof item === "object" || item === 0 ? (
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
                  number={item.number || item}
                  x={props.x}
                  key={i}
                />
              ) : (
                <SudokuLockedCell
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
                  number={item.number || item}
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
