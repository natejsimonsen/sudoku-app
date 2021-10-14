import React from "react";
import useFetch from "use-http";

import { SudokuProvider } from "../context/sudokuContext";
import { UserConfigProvider } from "../context/userConfigContext";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SudokuGrid from "../components/SudokuGrid";
import SudokuToolbar from "../components/SudokuToolbar";

const IndexPage = () => {
  const apiUrl = process.env.GATSBY_PRODUCTION
    ? "https://sudoku-generator-api.herokuapp.com/?difficulty=55"
    : "http://localhost:3000/?difficulty=55";

  const { loading, error, data } = useFetch(apiUrl, {}, []);

  return (
    <>
      <SudokuProvider>
        <UserConfigProvider>
          <Layout>
            <Seo title="Sudoku Puzzle" />
            {error && <p>{error}</p>}
            <div className="flex justify-between max-w-6xl mx-auto">
              <SudokuGrid loading={loading} data={data} />
              <SudokuToolbar />
            </div>
            {process.env.GATSBY_PRODUCTION && (
              <p className="block max-w-lg pt-8 mx-auto">
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
