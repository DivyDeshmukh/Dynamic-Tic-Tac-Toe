import React, { useEffect, useState } from "react";
import useTicTacToe from "../Hooks/useTicTacToe";

function TicTacToe({ boardSize }) {
  const { isXTurn, board, handleClick, winner, reset } = useTicTacToe(
    boardSize,
    boardSize * boardSize
  );

  // done with DOM because after trying also the grid cols and rows are not changing dynamically based on the boardSize
  useEffect(() => {
    document.querySelector(
      ".grid"
    ).style.gridTemplateColumns = `repeat(${boardSize}, minmax(100px, 1fr))`;

    document.querySelector(
      ".grid"
    ).style.gridTemplateRows = `repeat(${boardSize}, minmax(100px, 1fr))`;
  }, [boardSize]);

  return (
    <div className="flex items-center justify-center">
      <div id="card" className="flex flex-col w-auto">
        <div
          id="info"
          className="bg-slate-400 flex justify-center items-center font-bold p-2 text-lg gap-4"
        >
          <h1>
            {winner
              ? winner === "draw"
                ? "Match Draw"
                : `Player ${winner} Wins`
              : `Player ${isXTurn ? "X" : "O"} Turn`}
          </h1>
          <button
            className="px-4 py-2 bg-black rounded-2xl text-md"
            onClick={reset}
          >
            reset game
          </button>
        </div>
        <div id="box" className={`grid mt-4 bg-red-600 h-fit w-full`}>
          {board.map((box, index) => (
            <button
              className={`bg-yellow-300 h-auto w-full border-2 border-black text-2xl font-bold text-red-500 ${
                box ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              key={index}
              onClick={() => handleClick(index)}
              disabled={box !== null}
            >
              {/* basically, board is getting updated when we are clicking on the button and hence this board will be rerendered and the value added by the user will be present at that respective index */}
              {box}
            </button>
          ))}
        </div>
      </div>

      {winner && (
        <div
          id="win"
          className="h-screen w-screen bg-black opacity-[0.9] absolute z-10 top-0 left-0"
        >
          <div className="bg-red-600 h-[50%] w-[50%] absolute top-[25%] left-[25%] text-center">
            <h1 className="text-3xl text-white font-bold translate-y-32">
              {winner === "draw"
                ? "Match Draw"
                : `Congratulations Player ${winner} won....`}
            </h1>
            <button
              className="absolute top-[-30px] font-bold"
              onClick={() => {
                reset();
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
