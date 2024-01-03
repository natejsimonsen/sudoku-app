import React from "react";

import { SudokuProvider } from "../context/sudokuContext";
import { UserConfigProvider } from "../context/userConfigContext";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SudokuGrid from "../components/SudokuGrid";
import SudokuToolbar from "../components/SudokuToolbar";

const IndexPage = () => {
  const arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(Math.random() > .5 ? (i + 1) + "A" : (i + 1) + "B");
}
 return (
    <p>{arr.toString()}</p>
 )
};

export default IndexPage;
