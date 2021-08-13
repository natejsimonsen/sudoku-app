import * as React from "react"
import PropTypes from "prop-types"
import { useUserConfig } from "../context/userConfigContext"
import { Link } from "gatsby"
import colors from "../config/colors"

const Header = ({ siteTitle }) => {
  const { state, dispatch } = useUserConfig()

  const handleClick = theme => {
    dispatch({ type: "changeTheme", theme: colors[theme] })
  }

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
          padding: `1.45rem 1.0875rem`,
        }}
        className="flex justify-between"
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/">Sudoku</Link>
        </h1>
        <div className="flex space-x-4">
          {Object.keys(colors).map(key => (
            <button onClick={handleClick.bind(null, key)}>{key}</button>
          ))}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
