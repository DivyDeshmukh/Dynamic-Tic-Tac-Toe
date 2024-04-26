import React, { useState, useEffect } from "react";

const emptyBoard = (numOfBoxes) => {
  // console.log(numOfBoxes);
  return Array(numOfBoxes).fill(null);
};

// dynamically generated patterns based on the board size
const generatePatterns = (boardSize) => {
  let patterns = [];
  let horizontalPatterns = [];
  let verticalPatterns = [];

  // horizontal Patterns
  let boxCount = 0;
  for (let i = 0; i < boardSize; i++) {
    let singlePattern = [];
    let count = 0;
    for (let j = boxCount; count !== boardSize; j++) {
      singlePattern.push(j);
      count++;
    }

    boxCount += boardSize;
    horizontalPatterns.push(singlePattern);
  }

  // vertical Patterns

  for (let i = 0; i < boardSize; i++) {
    let count = 0;
    let singlePattern = [];
    for (let j = i; count !== boardSize; j += boardSize) {
      singlePattern.push(j);
      count++;
    }

    verticalPatterns.push(singlePattern);
  }

  // diagonal patterns
  //  boardSize + 1 and boardSize - 1
  let rightDiagonal = [];
  let leftDiagonal = [];
  let count1 = 0;

  for (let i = 0; count1 !== boardSize; i = i + (boardSize + 1)) {
    rightDiagonal.push(i);
    count1++;
  }

  let count2 = 0;
  for (let i = boardSize - 1; count2 !== boardSize; i = i + (boardSize - 1)) {
    leftDiagonal.push(i);
    count2++;
  }

  patterns.push(
    ...horizontalPatterns,
    ...verticalPatterns,
    rightDiagonal,
    leftDiagonal
  );

  // console.log(patterns);

  return patterns;
};

function useTicTacToe(boardSize, numOfBoxes) {
  const [board, setBoard] = useState(emptyBoard(numOfBoxes));
  const [isXTurn, setIsXTurn] = useState(true);
  const [patterns, setPatterns] = useState([]);
  const [winner, setIsWinner] = useState("");

  useEffect(() => {
    // console.log(board);
  }, [numOfBoxes, board]);

  useEffect(() => {
    const possiblePatterns = generatePatterns(boardSize);
    setPatterns(possiblePatterns);
    // console.log(possiblePatterns);
    setBoard(emptyBoard(numOfBoxes));
  }, [boardSize]);

  useEffect(() => {
    // console.log(winner);
  }, [winner]);

  useEffect(() => {
    const isFinished = finished();
    if (isFinished) {
      setIsWinner(isFinished);
    }
  }, [board]);

  useEffect(() => {
    // console.log(board, isXTurn, patterns, winner, player);
  }, [board, isXTurn, patterns, winner]);

  const handleClick = (index) => {
    if (winner) {
      return;
    }

    setBoard((prev) => [
      ...board.slice(0, index),
      isXTurn ? "X" : "O",
      ...board.slice(index + 1, prev.length),
    ]);

    setIsXTurn((prev) => !prev);
  };

  // for a board of 3X3 this logic is correct inside finished but for dynamic boardSizes below logic should be implemented
  // const [a, b, c] = patterns[i];
  //     // if (board[a] && board[a] === board[b] && board[c] === board[a]) {
  //     //   console.log(a, b, c, board);
  //     //   return `${board[a]}`;
  //     // } else if (!board.includes(null)) {
  //     //   return `draw`;
  //     // } else {
  //     //   continue;
  //     // }

  const finished = () => {
    // compare board values every time with the patterns
    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const isWon = [];
      let a = null;

      // Check if the pattern is valid for the current board size, so here we are validating that index in board is always less than the board length
      if (pattern.every((index) => index < board.length)) {
        a = board[pattern[0]];

        for (let j = 1; j < pattern.length; j++) {
          const index = pattern[j];
          if (a && board[index] && a === board[index]) {
            isWon.push(true);
          } else {
            isWon.push(false);
          }
        }

        if (isWon.every((value) => value === true)) {
          return a;
        }
      }
    }

    if (!board.includes(null)) {
      return "draw";
    }

    return null;
  };

  const reset = () => {
    setBoard(emptyBoard(numOfBoxes));
    setIsXTurn(true);
    setIsWinner("");
  };

  return { board, isXTurn, handleClick, winner, reset };
}

export default useTicTacToe;

// create an empty array based on the boardSize and then implement it inside TicTacToe component to render boxes
//
