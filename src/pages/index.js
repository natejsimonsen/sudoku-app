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
    ? "https://sudoku-generator-api.herokuapp.com/?difficulty=50"
    : "http://localhost:3000/?difficulty=50";
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
/*         <div
              style={{ width: 800, height: 800, border: "1px solid black" }}
              className="grid grid-cols-3 grid-rows-3 mx-auto"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <div
                  className="bg-gray-200 grid grid-cols-3 grid-rows-3"
                  style={{
                    borderRight: index % 3 < 2 ? "2px solid black" : "none",
                    borderBottom: index < 6 ? "2px solid black" : "none",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                    <div
                      className="items-center justify-center text-3xl font-semibold text-center bg-gray-800"
                      style={{
                        outline: "1px solid black",
                      }}
                    >
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              ))}
              <div
                className="bg-gray-200"
                style={{ borderBottom: "2px solid black" }}
              ></div>
              <div
                className="bg-gray-200"
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              ></div>
              <div
                className="bg-gray-200"
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              ></div>
              <div
                className="bg-gray-200"
                style={{ borderBottom: "2px solid black" }}
              ></div>
              <div
                style={{ borderRight: "2px solid black" }}
                className="bg-gray-200"
              ></div>
              <div
                style={{ borderRight: "2px solid black" }}
                className="bg-gray-200"
              ></div>
              <div className="bg-gray-200"></div>
            </div>*/
