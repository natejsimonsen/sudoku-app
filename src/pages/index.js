import * as React from "react"
import useFetch from "use-http"

import { SudokuProvider } from "../context/sudokuContext"
import { UserConfigProvider } from "../context/userConfigContext"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SudokuGrid from "../components/SudokuGrid"

const IndexPage = () => {
  const { loading, error, data } = useFetch("http://localhost:3000/", {}, [])
  return (
    <SudokuProvider>
      <UserConfigProvider>
        <Layout>
          <Seo title="Sudoku Puzzle" />
          <h1>Sudoku</h1>
          {error && <p>{error}</p>}
          <SudokuGrid loading={loading} data={data} />
        </Layout>
      </UserConfigProvider>
    </SudokuProvider>
  )
}

export default IndexPage
