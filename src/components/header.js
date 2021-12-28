import React, { useState } from 'react';
import { useUserConfig } from '../context/userConfigContext';
import { Link } from 'gatsby';
import Modal from './Modal';
import Switch from './Switch';
import PaletteIcon from '@material-ui/icons/Palette';
import SettingsIcon from '@material-ui/icons/Settings';
// import Tabs from "./Tabs";
import ColorForm from './ColorForm';

const Header = () => {
  const { state, dispatch } = useUserConfig();
  const [open, setOpen] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);

  return (
    <header
      style={{
        background: state.theme.navBgColor,
        color: state.theme.color,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
        className="flex items-center justify-between h-20 px-8"
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/">Sudoku</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            className="outline-none"
            onClick={setOpenColorModal.bind(null, true)}
          >
            <PaletteIcon fontSize="large" />
          </button>
          <button className="outline-none" onClick={setOpen.bind(null, true)}>
            <SettingsIcon fontSize="large" />
          </button>
          <Modal centered open={openColorModal} setOpen={setOpenColorModal}>
            <h2
              style={{ color: state?.color }}
              className="font-bold text-3xl text-center mx-auto"
            >
              Color Builder
            </h2>
            <ColorForm />
          </Modal>
          <Modal open={open} setOpen={setOpen}>
            <h2 className="pb-2 text-3xl font-bold">Highlighting</h2>
            <hr
              className="w-48 mb-4 border-b"
              style={{ borderColor: state?.theme.borderColor }}
            />
            <div className="flex flex-col w-3/4 mx-auto space-y-4 divide-y">
              <Switch
                clicked={dispatch?.bind(null, { type: 'highlightBlocks' })}
                checked={state?.highlightBlocks}
                label="Highlight Blocks"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: 'highlightRows' })}
                checked={state?.highlightRows}
                label="Highlight Rows"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: 'highlightColumns' })}
                checked={state?.highlightCols}
                label="Highlight Columns"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: 'highlightSameNumbers' })}
                checked={state?.highlightSameNumbers}
                label="Highlight Same Numbers"
              />
              <Switch
                clicked={dispatch?.bind(null, { type: 'toggleErrors' })}
                checked={state?.showUserErrors}
                label="Autocheck Mistakes"
              />
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
