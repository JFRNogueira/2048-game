import cloneDeep from "lodash.clonedeep";

const swipeRight = (data, addNumber, setData, mock) => {
  let oldGrid = data;
  let newGrid = cloneDeep(data);

  for (let i = 3; i >= 0; i--) {
    let row = newGrid[i];
    let pos1 = row.length - 1;
    let pos2 = pos1 - 1;

    while (pos1 > 0) {
      if (pos2 === -1) {
        pos1--;
        pos2 = pos1 - 1;
        continue;
      }

      if (row[pos2] === 0) {
        pos2--;
      } else if (row[pos1] === 0) {
        row[pos1] = row[pos2];
        row[pos2] = 0;
        pos2--;
      } else if (row[pos1] !== 0) {
        if (row[pos1] === row[pos2]) {
          row[pos1] = row[pos1] + row[pos2];
          row[pos2] = 0;
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

export default swipeRight