import cloneDeep from "lodash.clonedeep";

const swipeDown = (data, addNumber, setData, mock) => {
  let oldGrid = data// JSON.parse(JSON.stringify(data));
  let newGrid = cloneDeep(data);

  for (let i = 0; i < 4; i++) {
    let pos1 = newGrid.length - 1;
    let pos2 = pos1 - 1;

    while (pos1 > 0) {
      if (pos2 === -1) {
        pos1--;
        pos2 = pos1 - 1;
        continue;
      }

      if (newGrid[pos2][i] === 0) {
        pos2--;
      } else if (newGrid[pos1][i] === 0) {
        newGrid[pos1][i] = newGrid[pos2][i];
        newGrid[pos2][i] = 0;
        pos2--;
      } else if (newGrid[pos1][i] !== 0) {
        if (newGrid[pos1][i] === newGrid[pos2][i]) {
          newGrid[pos1][i] = newGrid[pos1][i] + newGrid[pos2][i];
          newGrid[pos2][i] = 0;
          pos1--;
          pos2 = pos1 - 1;
        } else {
          pos1--;
          pos2 = pos1 - 1;
        }
      }
    }
  }
  if (JSON.stringify(newGrid) !== JSON.stringify(oldGrid)) {
    addNumber(newGrid);
  }

  if (mock) {
    return newGrid;
  } else {
    setData(newGrid);
  }
};

export default swipeDown