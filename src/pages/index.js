import React from "react";
import useFetch from "use-http";

import { SudokuProvider } from "../context/sudokuContext";
import { UserConfigProvider } from "../context/userConfigContext";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SudokuGrid from "../components/SudokuGrid";
import SudokuToolbar from "../components/SudokuToolbar";

const IndexPage = () => {
  const apiUrl = "http://localhost:3000";
  const { loading, error, data } = useFetch(apiUrl, {}, []);

  return (
    <>
      <SudokuProvider>
        <UserConfigProvider>
          <Layout>
            <Seo title="Sudoku Puzzle" />
            {error && <p>{error}</p>}
            <SudokuGrid loading={loading} data={data} />
            <SudokuToolbar />
            {process.env.GATSBY_PRODUCTION && (
              <p className="max-w-lg mx-auto block pt-8">
                More Features shall be added, including user options,
                customizable themes, and difficulty levels, as well as speed
                improvements in the backend and a mobile version!
              </p>
            )}
          </Layout>
        </UserConfigProvider>
      </SudokuProvider>
    </>
  );
};

export default IndexPage;
