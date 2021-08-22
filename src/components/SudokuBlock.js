import React from "react";
import SudokuCell from "./SudokuCell";
import SudokuLockedCell from "./SudokuLockedCell";

const SudokuBlock = (props) => {
  return (
    <div className="shadow-lg sudoku-block" data-block={props.i}>
      <div className="flex items-center justify-center grid grid-cols-3 grid-rows-3">
        {props.dumb
          ? props.block.map((item, i) => (
              <SudokuLockedCell
                rowBlock={props.rowBlock}
                colBlock={props.colBlock}
                block={props.i}
                i={i}
                number={item}
                x={props.x}
                key={i}
              />
            ))
          : props.block
              .flat()
              .map((item, i) =>
                typeof item === "object" || item === 0 ? (
                  <SudokuCell
                    correctNumber={props.completeBlock.flat()[i]}
                    rowBlock={props.rowBlock}
                    colBlock={props.colBlock}
                    block={props.i}
                    i={i}
                    number={item.number || item}
                    x={props.x}
                    key={i}
                  />
                ) : (
                  <SudokuLockedCell
                    rowBlock={props.rowBlock}
                    colBlock={props.colBlock}
                    block={props.i}
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
