import { useEffect, useState } from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe";
import Input from "./components/Input";
// import useTicTacToe from "./Hooks/useTicTacToe";

function App() {
  const [boardSize, setBoardSize] = useState(3);

  const updateBoardSize = (value) => {
    value >= 3 && setBoardSize(value);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col gap-6">
      <Input updateBoardSize={updateBoardSize} />
      <TicTacToe boardSize={boardSize} />
    </div>
  );
}

export default App;
