import React from "react";
import SudokuCell from "./SudokuCell";
import SudokuLockedCell from "./SudokuLockedCell";
import { useUserConfig } from "../context/userConfigContext";

const SudokuBlock = (props) => {
  const { state } = useUserConfig();
  const block = props.i;
  const borderStyle = { borderRight: null, borderBottom: null };

  if (block % 3 < 2) {
    borderStyle.borderRight = `1px solid ${state?.theme.boldBorderColor}`;
  }

  if (block < 6) {
    borderStyle.borderBottom = `1px solid ${state?.theme.boldBorderColor}`;
  }

  return (
    <div
      className="overflow-hidden outline-none shadow-lg sudoku-block"
      data-block={props.i}
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
          : props.block.flat().map((item, i) =>
              typeof item === "object" || item === 0 ? (
                <SudokuCell
                  correctNumber={props.completeBlock.flat()[i]}
                  block={props.i}
                  i={i}
                  number={item.number || item}
                  numsExclude={props.block
                    .flat()
                    .filter(
                      (num) => !Array.isArray(num) && typeof num === "object"
                    )
                    .map((num) => num.number)}
                  x={props.x}
                  key={i}
                />
              ) : (
                <SudokuLockedCell
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
