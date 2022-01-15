import React from "react";

import { SudokuProvider } from "../context/sudokuContext";
import { UserConfigProvider } from "../context/userConfigContext";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SudokuGrid from "../components/SudokuGrid";
import SudokuToolbar from "../components/SudokuToolbar";

const IndexPage = () => {
  const [clicked, setClick] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://nate-simonsen-sudoku-generator.herokuapp.com/?difficulty=55"
      : "http://localhost:3000/?difficulty=55";

  React.useEffect(() => {
    setLoading(true);
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (e) {
      setError(e.message);
    }
  }, [clicked]);

  return (
    <>
      {/*<button onClick={() => setClick(!clicked)}>Click me</button>*/}
      <SudokuProvider>
        <UserConfigProvider>
          <Layout>
            <Seo title="Sudoku Puzzle" />
            {error && <p>{error}</p>}
            <div className="flex justify-between max-w-6xl mx-auto">
              <SudokuGrid loading={loading} data={data} />
              <SudokuToolbar />
            </div>
          </Layout>
        </UserConfigProvider>
      </SudokuProvider>
    </>
  );
};

export default IndexPage;
