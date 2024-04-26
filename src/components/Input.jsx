import React, { useState } from "react";

function Input({ updateBoardSize }) {
  const [value, setValue] = useState(3);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // console.log("input", typeof value);
        updateBoardSize(Number(value));
      }}
      className="flex gap-4 items-center"
    >
      <label htmlFor="input" className="font-semibold">
        Enter the board size:{" "}
      </label>
      <input
        type="number"
        id="input"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="text-black pl-2 font-semibold rounded-md"
      />
      <button
        type="submit"
        className="bg-red-500 px-4 py-1 rounded-lg font-semibold"
      >
        Submit
      </button>
    </form>
  );
}

export default Input;
