import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "reactstrap";

const CISOR = "✂️";
const PAPER = "🧻";
const ROCK = "🗿";

function App() {
  const signs = [CISOR, PAPER, ROCK];

  const [userState, setUserState] = useState(null);
  const [iaState, setIaState] = useState(null);
  //const [counter, setcounter] = useState(0)
  const [userScore, setUserScore] = useState(0);
  const [iaScore, setIaScore] = useState(0);
  const [clicked, setClicked] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [counter, setCounter] = useState(15);

  function checkResult(userSign, opponentSign) {
    console.log(userSign, opponentSign);
    switch (userSign) {
      case PAPER:
        if (opponentSign === ROCK) {
          setUserScore((prevState) => prevState + 1);
        } else if (opponentSign === CISOR) {
          setIaScore((prevState) => prevState + 1);
        }
        break;
      case ROCK:
        if (opponentSign === CISOR) {
          setUserScore((prevState) => prevState + 1);
        } else if (opponentSign === PAPER) {
          setIaScore((prevState) => prevState + 1);
        }
        break;
      case CISOR:
        if (opponentSign === PAPER) {
          setUserScore((prevState) => prevState + 1);
        } else if (opponentSign === ROCK) {
          setIaScore((prevState) => prevState + 1);
        }
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (startGame) {
      setTimeout(() => {
        setStartGame(false);
      }, 16000);
    } else {
      setStartGame(false);
      setCounter(15);
      setIaScore(0);
      setUserScore(0);
    }
  }, [startGame]);

  useEffect(() => {
    startGame &&
      setTimeout(() => setCounter((prevState) => prevState - 1), 1000);
  }, [counter, startGame]);

  useEffect(() => {
    checkResult(userState, iaState);
  }, [clicked]);

  function generateIAState() {
    const index = Math.floor(Math.random() * Math.floor(signs.length));
    setIaState(signs[index]);
  }

  function handleUserState(sign) {
    setClicked((prevState) => !prevState);
    generateIAState();
    setUserState(sign);
  }

  return (
    <div className="App">
      <div>
        <h4>Remaining time : {counter}</h4>
      </div>
      <h3>Current sign : {userState ? userState : "Rien"}</h3>
      <h3>Opponent sign : {iaState ? iaState : "Rien"}</h3>
      {signs.map((sign, index) => (
        <Button
          color="secondary"
          onClick={() => handleUserState(sign)}
          disabled={!startGame}
        >
          {sign}
        </Button>
      ))}
      <Button onClick={() => setStartGame(true)}>Start game</Button>
      <h3
        style={{
          color: userScore > iaScore ? "green" : userScore !== iaScore && "red",
        }}
      >
        Your score : {userScore}
      </h3>
      <h3
        style={{
          color: userScore < iaScore ? "green" : userScore !== iaScore && "red",
        }}
      >
        Opponent's score : {iaScore}
      </h3>
    </div>
  );
}

export default App;
