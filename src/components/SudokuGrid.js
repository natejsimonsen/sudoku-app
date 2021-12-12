import React, { useEffect } from "react";
import SudokuBlock from "./SudokuBlock";
import { useSudoku } from "../context/sudokuContext";
import { useUserConfig } from "../context/userConfigContext";
import { useKey } from "react-use";
import _ from "lodash";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const SudokuGrid = (props) => {
  const [state, dispatch] = useSudoku();
  const { state: themeState } = useUserConfig();

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
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
    "r",
    "R",
    "u",
    "U",
    "z",
    "Z",
    "n",
    "h",
    "N",
    "H",
    "w",
    "a",
    "s",
    "d",
    "W",
    "A",
    "S",
    "D",
  ];

  const keyPressHandler = (event) => {
    if (state.disableHighlights) return;
    event.preventDefault();
    if (Number.isFinite(+event.key))
      dispatch({ type: "changeNum", data: +event.key });
    else if (event.key === "Backspace" || event.key === "Delete")
      dispatch({ type: "changeNum", data: event.key, delete: true });
    else if (event.key === "r" || event.key === "R") dispatch({ type: "redo" });
    else if (
      event.key === "u" ||
      event.key === "U" ||
      event.key === "z" ||
      event.key === "Z"
    )
      dispatch({ type: "undo" });
    else if (event.key === "n" || event.key === "N")
      dispatch({ type: "toggleNotes" });
    else if (event.key === "h" || event.key === "H")
      dispatch({ type: "revealCell" });
    else dispatch({ type: "moveGrid", key: event.key });
  };

  useKey((event) => acceptedKeys.includes(event.key), keyPressHandler);

  const handleBlockClick = (e) => {
    e.preventDefault();

    if (props.loading) return;

    const block = e.target.closest(".sudoku-block");
    const sudokuCell = e.target.closest(".sudoku-cell");

    const rowNum = +sudokuCell.dataset.row;
    const columnNum = +sudokuCell.dataset.column;
    const currentNum = +sudokuCell.dataset.number;
    const blockNum = +block.dataset.block;

    dispatch({ type: "enableHighlights" });
    dispatch({
      type: "setHighlights",
      grid: [blockNum, rowNum, columnNum, currentNum],
    });
  };

  // min is 320 px
  // max is none
  // best results within 400-800 px
  const sudokuGridWidth = 657;

  useEffect(() => {
    const originalData = _.cloneDeep(props.data);
    dispatch({ type: "initialize", data: originalData });
  }, [props.loading]);

  const handleClickAway = (e) => {
    if (e.target.closest(".sudoku-toolbar")) return;
    dispatch({ type: "disableHighlights" });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <section
        className="grid grid-cols-3 grid-rows-3"
        style={{
          border: `1px solid ${themeState?.theme.borderColor}`,
          boxSizing: "content-box",
          width: sudokuGridWidth,
          height: sudokuGridWidth,
        }}
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
            key={i}
            block={block}
            x={sudokuGridWidth}
            i={i}
          />
        ))}
      </section>
    </ClickAwayListener>
  );
};

export default SudokuGrid;
