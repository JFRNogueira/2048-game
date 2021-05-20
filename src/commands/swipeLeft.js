import cloneDeep from "lodash.clonedeep";

const swipeLeft = (data, addNumber, setData, mock) => {
  let oldGrid = data;
  let newGrid = cloneDeep(data);

  for (let i = 0; i < 4; i++) {
    let row = newGrid[i];
    let pos1 = 0;
    let pos2 = 1;

    while (pos1 < 4) {
      if (pos2 === 4) {
        pos1++;
        pos2 = pos1 + 1;
        continue;
      }


      if (row[pos2] === 0) {
        pos2++;
      } else if (row[pos1] === 0) {
        row[pos1] = row[pos2];
        row[pos2] = 0;
        pos2++;
      } else if (row[pos1] !== 0) {
        if (row[pos1] === row[pos2]) {
          row[pos1] = row[pos1] + row[pos2];
          row[pos2] = 0;
          pos1++;
          pos2 = pos1 +
          
          
          
          1;
        } else {
          pos1++;
          pos2 = pos1 + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldGrid) !== JSON.stringify(newGrid)) {
    addNumber(newGrid);
  }
  if (mock) {
    return newGrid;
  } else {
    setData(newGrid);
  }
};


export default swipeLeft



