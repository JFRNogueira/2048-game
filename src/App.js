import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./util";
import Swipe from "react-easy-swipe";

import swipeLeft from './commands/swipeLeft'
import swipeRight from './commands/swipeRight'
import swipeUp from './commands/swipeUp'
import swipeDown from './commands/swipeDown'
import handleKeyDown from './commands/handleKeyDown'

import './index.css';

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState(false);

  // Set score state
  const [score, setScore] = useState(0);

  // Initialize:
  // Add two random numbers to grid
  const initialize = () => {
    let emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setGameOver(false)
    setScore(0)
    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };



  // isGridFull:
  // Checks if the grid is full, i. e., has no empty cell available
  // If there is at least one cell with value 0 (zero), the grid is NOT full
  const isGridFull = (grid) => {
    console.log('check:')
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        console.log(grid[row][col])
        if (grid[row][col] === 0) {
          return false
        }
      }
    }
    return true
  }



  // AddNumber: 
  // Inserts a number (2 or 4) in a random and empty position on grid
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;

    while (!added) {
      if (gridFull) {
        break;
      }

      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[row][col] === 0) {
        let numberToAdd = Math.random() > 0.5 ? 2 : 4;
        newGrid[row][col] = numberToAdd;
        added = true;
        incrementScore(numberToAdd);
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOver = checkIfGameIsOver();
        if (gameOver) {
          alert("Game over");
        }
      }
    }
  };



  const incrementScore = (numberToAdd) => {
    let newScore = score + numberToAdd
    setScore(newScore);
  };





  // Check if game over, i. e. there is no possible move
  // It mocks a move and checks if the data result is different from previous state
  const checkIfGameIsOver = () => {
    let checkLeft = swipeLeft(data, addNumber, setData, true);
    if (JSON.stringify(data) !== JSON.stringify(checkLeft)) {
      return false;
    }

    let checkerDown = swipeDown(data, addNumber, setData, true);
    if (JSON.stringify(data) !== JSON.stringify(checkerDown)) {
      return false;
    }

    let checkerRight = swipeRight(data, addNumber, setData, true);
    if (JSON.stringify(data) !== JSON.stringify(checkerRight)) {
      return false;
    }

    let checkerUp = swipeUp(data, addNumber, setData, true);
    if (JSON.stringify(data) !== JSON.stringify(checkerUp)) {
      return false;
    }

    return true;
  };



  // Handles events (arrow key is pressed)
  const handleKeyDownLocal = (event) => {
    handleKeyDown(data, addNumber, setData, gameOver, checkIfGameIsOver, setGameOver, event)
  };

  useEffect(() => {
    initialize();
  }, []);

  // This is a custom function
  useEvent("keydown", handleKeyDownLocal);

  return (
    <div className="App">
      <div
        style={{
          width: 345,
          margin: "auto",
          marginTop: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontFamily: "sans-serif",
              flex: 1,
              fontWeight: "700",
              fontSize: 60,
              color: "#776e65",
            }}
          >
            2048
          </div>
          <div
            style={{
              flex: 1,
              marginTop: "auto",
            }}
          >
            <div onClick={
              initialize} style={style.newGameButton}>
              New game
            </div>
            <div>
              {`Score: ${score}`}
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#AD9D8F",
            width: "max-content",
            height: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          {gameOver && (
            <div style={style.gameOverOverlay}>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                    color: "#776E65",
                  }}
                >
                  Game over
                </div>
                <div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "auto",
                    }}
                  >
                    <div onClick={
                      initialize} style={style.tryAgainButton}>
                      Try again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onSwipeDown={() => swipeDown(data, addNumber, setData)}
            onSwipeLeft={() => swipeLeft(data, addNumber, setData)}
            onSwipeRight={() => swipeRight(data, addNumber, setData)}
            onSwipeUp={() => swipeUp(data, addNumber, setData)}

            style={{ overflowY: "hidden" }}
          >
            {data.map((row, rowIndex) => {
              return (
                <div style={{ display: "flex" }} key={rowIndex}>
                  {row.map((digit, colIndex) => (
                    <Block num={digit} key={colIndex} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        </div>

        <div style={{ width: "inherit" }}>
          <p class="game-explanation">
            <strong class="important">How to play:</strong> {" "}
            Use your arrow keys to move the tiles.
            When two tiles with the same number touch, they merge into one!
          </p>
        </div>
      </div>
    </div>
  );
}

const Block = ({ num }) => {
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num !== 0 ? num : ""}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
  newGameButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    marginLeft: "auto",
    marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
