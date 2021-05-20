import swipeLeft from './swipeLeft'
import swipeRight from './swipeRight'
import swipeUp from './swipeUp'
import swipeDown from './swipeDown'

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const handleKeyDown = (data, addNumber, setData, gameOver, checkIfGameIsOver, setGameOver, event) => {
  if (gameOver) {
    return;
  }
  switch (event.keyCode) {
    case UP_ARROW:
      swipeUp(data, addNumber, setData);
      break;
    case DOWN_ARROW:
      swipeDown(data, addNumber, setData);
      break;
    case LEFT_ARROW:
      swipeLeft(data, addNumber, setData);
      break;
    case RIGHT_ARROW:
      swipeRight(data, addNumber, setData);
      break;
    default:  // If any other key is pressed, ignore
      break;
  }

  if (checkIfGameIsOver()) {
    setGameOver(true);
  }
};

export default handleKeyDown