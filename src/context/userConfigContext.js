import React, { useContext, useReducer } from "react"
import colors from "../config/colors"

const defaultConfig = {
  notes: false,
  showUserErrors: true,
  theme: {
    ...colors.Light,
  },
}

const UserConfigContext = React.createContext(defaultConfig)

const userConfigReducer = (state, action) => {
  switch (action.type) {
    case "changeTheme":
      return { ...state, theme: action.theme }
    case "toggleNotes":
      return { ...state, notes: !state.notes }
    case "toggleErrors":
      return { ...state, showUserErrors: !state.showUserErrors }
    default:
      throw new Error(
        `There is no action with type of ${action.type} in userConfigReducer, please specify a valid option`
      )
  }
}

const UserConfigProvider = ({ children }) => {
  const context = useReducer(userConfigReducer, defaultConfig)
  return (
    <UserConfigContext.Provider value={context}>
      {children}
    </UserConfigContext.Provider>
  )
}

const useUserConfig = () => {
  const [state, dispatch] = useContext(UserConfigContext)
  const value = { state, dispatch }
  return value
}

export { UserConfigProvider, useUserConfig }
