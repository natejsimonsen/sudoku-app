import React, { useEffect } from 'react';
import { useUserConfig } from '../context/userConfigContext';
import { useSudoku } from '../context/sudokuContext';
import _ from 'lodash';

const SudokuCell = ({ i, x, block, ...props }) => {
  const [sudokuState, dispatch] = useSudoku();
  const { state } = useUserConfig();

  useEffect(() => {
    const key = sudokuState.currentNum;

    if (props.highlighted === 2) {
      let newState;

      if (!sudokuState?.notes) {
        if (!Number.isNaN(key) && key > 0) {
          newState = key;
        } else if (key === 'Backspace' || key === 'Delete') {
          newState = 0;
        }

        if (newState === 0)
          dispatch({
            type: 'addItem',
            data: 0,
          });
        else
          dispatch({
            type: 'addItem',
            data: { number: newState },
          });
      } else {
        if (
          (!Array.isArray(props.number) || props.number === 0) &&
          Number.isFinite(key) &&
          key > 0
        )
          dispatch({
            type: 'addItem',
            data: [key],
          });
        else if (Array.isArray(props.number) && props.number.includes(key))
          dispatch({
            type: 'removeNote',
            data: key,
          });
        else if (Number.isFinite(key) && key > 0)
          dispatch({
            type: 'addNote',
            data: key,
          });

        if (props.number.length > 0 && key === 'Backspace')
          dispatch({
            type: 'removeNoteEnd',
          });
        else if (props.number.length > 0 && key === 'Delete')
          dispatch({
            type: 'removeNoteStart',
          });
        else if (key === 'Backspace' || key === 'Delete')
          dispatch({ type: 'removeNum' });
      }
      dispatch({
        type: 'setHistory',
        data:
          props.number && Number.isFinite(props.number)
            ? { number: props.number }
            : props.number,
      });
    }
  }, [sudokuState.keyHit]);

  let backgroundColor = state.theme.bgColor;
  let sudokuNumberColor = state.theme.color;

  if (!state.showUserErrors) sudokuNumberColor = state.theme.userSudokuNumColor;
  else if (sudokuState.complete[block][i] === props.number)
    sudokuNumberColor = state.theme.successColor;
  else sudokuNumberColor = state.theme.errorColor;

  if (props.highlighted === 1) backgroundColor = state.theme.highlightBgColor;
  else if (props.highlighted === 2)
    backgroundColor = state.theme.darkerHighlightBg;

  const normalModeClass =
    'sudoku-cell font-semibold flex justify-center text-center items-center';
  const notesModeClass =
    'font-semibold text-center sudoku-cell grid grid-cols-3 grid-rows-3 flex justify-center items-center';
  const sudokuStyles = {
    fontSize: !Array.isArray(props.number) ? x / 14 : x / 42,
    height: x / 9,
    width: x / 9,
    outline: `1px solid ${state.theme.borderColor}`,
    backgroundColor: sudokuState.disableHighlights
      ? state.theme.bgColor
      : backgroundColor,
    color: !Array.isArray(props.number) ? sudokuNumberColor : state.theme.color,
  };

  return (
    <div
      className={
        !Array.isArray(props.number) ? normalModeClass : notesModeClass
      }
      onClick={() => {
        dispatch({ type: 'setCoords', coords: [block, i] });
      }}
      style={sudokuStyles}
    >
      {!Array.isArray(props.number) ? (
        <p>{props.number !== 0 && props.number}</p>
      ) : (
        <>
          {props.number.map((note) => (
            <p
              key={note}
              style={{
                backgroundColor:
                  sudokuState.currentNum === note
                    ? state.theme.darkerHighlightBg
                    : 'transparent',
                gridRowStart: Math.floor((note - 1) / 3 + 1),
                gridColumnStart: Math.floor(((note - 1) % 3) + 1),
              }}
              className="m-px rounded-full"
            >
              {note}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default SudokuCell;
