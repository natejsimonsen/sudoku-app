import React from "react";

import { SudokuProvider } from "../context/sudokuContext";
import { UserConfigProvider } from "../context/userConfigContext";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SudokuGrid from "../components/SudokuGrid";
import SudokuToolbar from "../components/SudokuToolbar";

const IndexPage = () => {
  const [clicked] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const apiUrl = "http://localhost:3000?difficulty=55";

  React.useEffect(() => {
    try {
      console.log("fetching")
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
