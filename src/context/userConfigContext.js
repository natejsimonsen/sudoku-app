import React, { useContext, useReducer } from 'react';
import colors from '../config/colors';
import _ from 'lodash';

let defaultConfig = {
  showUserErrors: true,
  highlightBlocks: true,
  highlightRows: true,
  highlightCols: true,
  highlightSameNumbers: true,
  themes: _.cloneDeep(colors),
  theme: colors.default,
  nameOfTheme: '',
  disableClick: false,
};

const UserConfigContext = React.createContext(defaultConfig);

const userConfigReducer = (state, action) => {
  let settings;
  switch (action.type) {
    case 'loadSettings':
      settings = action.settings;
      break;
    case 'changeTheme':
      settings = {
        ...state,
        theme: state.themes[action.name],
        nameOfTheme: action.name,
      };
      break;
    case 'addTheme':
      settings = {
        ...state,
        themes: { ...state.themes, [action.name]: action.theme },
      };
      break;
    case 'toggleErrors':
      settings = { ...state, showUserErrors: !state.showUserErrors };
      break;
    case 'highlightBlocks':
      settings = { ...state, highlightBlocks: !state.highlightBlocks };
      break;
    case 'highlightRows':
      settings = { ...state, highlightRows: !state.highlightRows };
      break;
    case 'highlightColumns':
      settings = { ...state, highlightCols: !state.highlightCols };
      break;
    case 'highlightSameNumbers':
      settings = {
        ...state,
        highlightSameNumbers: !state.highlightSameNumbers,
      };
      break;
    case 'highlightNumbers':
      settings = { ...state, showUserErrors: !state.showUserErrors };
      break;
    default:
      throw new Error(
        `There is no action with type of ${action.type} in userConfigReducer, please specify a valid option`
      );
  }
  typeof localStorage !== 'undefined' &&
    localStorage.setItem('settings', JSON.stringify(settings));
  return settings;
};

const UserConfigProvider = ({ children }) => {
  const context = useReducer(userConfigReducer, defaultConfig);
  React.useEffect(() => {
    // this is the dispatch for the reducer to load localstorage settings
    context[1]({
      type: 'loadSettings',
      settings: JSON.parse(localStorage.getItem('settings')),
    });
  }, []);
  return (
    <UserConfigContext.Provider value={context}>
      {children}
    </UserConfigContext.Provider>
  );
};

const useUserConfig = () => {
  const [state, dispatch] = useContext(UserConfigContext);
  const value = { state, dispatch };
  return value;
};

export { UserConfigProvider, useUserConfig };
