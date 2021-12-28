import React, { useState, useCallback } from 'react';
import { useUserConfig } from '../context/userConfigContext';
import { useSudoku } from '../context/sudokuContext';
import { Create } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const nonNegative = (i) => {
  if (i < 0) return 0;
  return i;
};

const SudokuToolbar = (props) => {
  const { state: userState, dispatch } = useUserConfig();

  const [sudokuState, sudokuDispatch] = useSudoku();
  const [height, setHeight] = useState(100);

  const ref = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().width / 3 - 11);
    }
  }, []);

  return (
    <div
      role="menu"
      onClick={() => {
        sudokuDispatch({
          type: 'enableHighlights',
        });
      }}
      className="sudoku-toolbar pb-0 mx-auto mb-0"
    >
      <div className="mb-6 space-x-5" ref={ref}>
        <button
          onClick={sudokuDispatch.bind(null, { type: 'toggleNotes' })}
          style={{
            backgroundColor: sudokuState?.notes
              ? userState.theme.darkerHighlightBg
              : userState.theme.navBgColor,
          }}
          className="p-2 rounded-lg shadow-xl outline-none hover:opacity-75"
        >
          <Create fontSize="large" />
          <div
            style={{
              backgroundColor: userState.theme?.successColor,
              color: userState.theme.bgColor,
              zIndex: 0,
            }}
            className="absolute inline-block px-2 -mt-4 -ml-2 font-semibold rounded-full"
          >
            {sudokuState?.notes ? (
              <p className="text-xs">On</p>
            ) : (
              <p className="text-xs">Off</p>
            )}
          </div>
        </button>
        <button
          onClick={sudokuDispatch.bind(null, { type: 'undo' })}
          className="p-2 rounded-lg shadow-xl outline-none hover:opacity-75"
          style={{
            backgroundColor: userState.theme.navBgColor,
          }}
        >
          <ReplayIcon fontSize="large" />
        </button>
        <button
          onClick={sudokuDispatch.bind(null, { type: 'redo' })}
          className="p-2 rounded-lg shadow-xl outline-none hover:opacity-75"
          style={{
            backgroundColor: userState.theme.navBgColor,
          }}
        >
          <ReplayIcon style={{ transform: 'scaleX(-1)' }} fontSize="large" />
        </button>
        <button
          onClick={sudokuDispatch.bind(null, { type: 'revealCell' })}
          className="p-2 rounded-lg shadow-xl outline-none hover:opacity-75"
          style={{
            backgroundColor: userState.theme.navBgColor,
          }}
        >
          <EmojiObjectsIcon fontSize="large" />
        </button>
        <button
          onClick={sudokuDispatch.bind(null, {
            type: 'changeNum',
            data: 'Backspace',
          })}
          className="p-2 rounded-lg shadow-xl outline-none hover:opacity-75"
          style={{
            backgroundColor: userState.theme.navBgColor,
          }}
        >
          <HighlightOffIcon fontSize="large" />
        </button>
      </div>
      <div className="text-7xl grid grid-cols-3 grid-rows-3 gap-4">
        {numbers.map((number) => (
          <button
            key={number}
            className="relative font-semibold shadow-xl outline-none hover:opacity-75"
            style={{
              backgroundColor: userState.theme.highlightBgColor,
              height,
            }}
            onClick={() => sudokuDispatch({ type: 'changeNum', data: number })}
          >
            {number}
            <p
              className="absolute text-sm -ml-1 h-5 w-5 shadow-sm rounded-full"
              style={{ backgroundColor: userState.theme.darkerHighlightBg }}
            >
              {nonNegative(
                9 -
                  sudokuState.puzzle
                    .flat()
                    .flat()
                    .reduce((acc, val) => {
                      if (val === number) return (acc += 1);
                      if (val?.number === number) return (acc += 1);
                      return acc;
                    }, 0)
              )}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SudokuToolbar;
