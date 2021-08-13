import React from "react"

const SudokuContext = React.createContext()

function SudokuProvider({ children }) {
  const [state, setState] = React.useState([])
  const value = { state, setState }
  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  )
}

function useSudoku() {
  const context = React.useContext(SudokuContext)
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }
  return context
}

export { SudokuProvider, useSudoku }
