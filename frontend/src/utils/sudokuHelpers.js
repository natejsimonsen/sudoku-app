const getBlockRowColNums = (grid = [], coords) => {
  const [blockIndex, cellIndex] = coords;
  const startRowBlock = Math.floor(blockIndex / 3) * 3;
  const startColBlock = blockIndex % 3;
  const startRowCell = Math.floor(cellIndex / 3) * 3;
  const startColCell = cellIndex % 3;

  const block = grid[blockIndex];
  const row = [
    grid[startRowBlock][startRowCell],
    grid[startRowBlock][startRowCell + 1],
    grid[startRowBlock][startRowCell + 2],
    grid[startRowBlock + 1][startRowCell],
    grid[startRowBlock + 1][startRowCell + 1],
    grid[startRowBlock + 1][startRowCell + 2],
    grid[startRowBlock + 2][startRowCell],
    grid[startRowBlock + 2][startRowCell + 1],
    grid[startRowBlock + 2][startRowCell + 2],
  ];
  const col = [
    grid[startColBlock][startColCell],
    grid[startColBlock][startColCell + 3],
    grid[startColBlock][startColCell + 6],
    grid[startColBlock + 3][startColCell],
    grid[startColBlock + 3][startColCell + 3],
    grid[startColBlock + 3][startColCell + 6],
    grid[startColBlock + 6][startColCell],
    grid[startColBlock + 6][startColCell + 3],
    grid[startColBlock + 6][startColCell + 6],
  ];

  const blockIndicies = [
    [blockIndex, 0],
    [blockIndex, 1],
    [blockIndex, 2],
    [blockIndex, 3],
    [blockIndex, 4],
    [blockIndex, 5],
    [blockIndex, 6],
    [blockIndex, 7],
    [blockIndex, 8],
  ];

  const rowIndicies = [
    [startRowBlock, startRowCell],
    [startRowBlock, startRowCell + 1],
    [startRowBlock, startRowCell + 2],
    [startRowBlock + 1, startRowCell],
    [startRowBlock + 1, startRowCell + 1],
    [startRowBlock + 1, startRowCell + 2],
    [startRowBlock + 2, startRowCell],
    [startRowBlock + 2, startRowCell + 1],
    [startRowBlock + 2, startRowCell + 2],
  ];
  const colIndicies = [
    [startColBlock, startColCell],
    [startColBlock, startColCell + 3],
    [startColBlock, startColCell + 6],
    [startColBlock + 3, startColCell],
    [startColBlock + 3, startColCell + 3],
    [startColBlock + 3, startColCell + 6],
    [startColBlock + 6, startColCell],
    [startColBlock + 6, startColCell + 3],
    [startColBlock + 6, startColCell + 6],
  ];

  if (grid.length === 0) {
    return { blockIndicies, rowIndicies, colIndicies };
  }

  return [
    [block, blockIndicies],
    [row, rowIndicies],
    [col, colIndicies],
  ];
};

const getBlockRowColIndices = (data) => {
  const [blockIndex, cellIndex] = data;
  const startRowBlock = Math.floor(blockIndex / 3) * 3;
  const startColBlock = blockIndex % 3;
  const startRowCell = Math.floor(cellIndex / 3) * 3;
  const startColCell = cellIndex % 3;

  const blockIndicies = [
    [blockIndex, 0],
    [blockIndex, 1],
    [blockIndex, 2],
    [blockIndex, 3],
    [blockIndex, 4],
    [blockIndex, 5],
    [blockIndex, 6],
    [blockIndex, 7],
    [blockIndex, 8],
  ];

  const rowIndicies = [
    [startRowBlock, startRowCell],
    [startRowBlock, startRowCell + 1],
    [startRowBlock, startRowCell + 2],
    [startRowBlock + 1, startRowCell],
    [startRowBlock + 1, startRowCell + 1],
    [startRowBlock + 1, startRowCell + 2],
    [startRowBlock + 2, startRowCell],
    [startRowBlock + 2, startRowCell + 1],
    [startRowBlock + 2, startRowCell + 2],
  ];
  const colIndicies = [
    [startColBlock, startColCell],
    [startColBlock, startColCell + 3],
    [startColBlock, startColCell + 6],
    [startColBlock + 3, startColCell],
    [startColBlock + 3, startColCell + 3],
    [startColBlock + 3, startColCell + 6],
    [startColBlock + 6, startColCell],
    [startColBlock + 6, startColCell + 3],
    [startColBlock + 6, startColCell + 6],
  ];
  return { blockIndicies, rowIndicies, colIndicies };
};

export { getBlockRowColNums, getBlockRowColIndices };
