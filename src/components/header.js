import * as React from "react"
import { useUserConfig } from "../context/userConfigContext"
import { Link } from "gatsby"
import colors from "../config/colors"
import Dropdown from "./Dropdown"

const Header = () => {
  const { state, dispatch } = useUserConfig()

  const handleClick = theme => {
    dispatch({ type: "changeTheme", theme: colors[theme] })
  }

  return (
    <header
      style={{
        background: state?.theme.navBgColor,
        color: state?.theme.color,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
        className="flex justify-between"
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/">Sudoku</Link>
        </h1>
        <div className="flex space-x-4">
          <Dropdown onClick={handleClick} keys={Object.keys(colors)} />
        </div>
      </div>
    </header>
  )
}

export default Header
