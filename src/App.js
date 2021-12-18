import "./App.css";
import { InputBar, Todo } from "./Todo";
import React, { useState, useEffect } from "react";
import { ReactComponent as MoonLogo } from "./icon-moon.svg";

const initialData = [
  { text: "I am a list item", completed: false, active: true },
  { text: "Take out the trash", completed: false, active: true },
  {
    text: "Blah blah blah. Computer stuff. Blah!",
    completed: false,
    active: true,
  },
];

function App() {
  const [data, setData] = useState(initialData);

  const handleInputData = (inputData) => {
    setData(() => {
      return [inputData, ...data];
    });
  };

  return (
    <div className="App">
      <div id="background-img"></div>
      <header>
        <h1>TODO</h1>
        <MoonLogo />
      </header>
      <InputBar handleInput={handleInputData} />
      <Todo data={data} />
      {/* Add dynamic number */}
      items left All Active Completed Clear Completed Drag and drop to reorder
      list
      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#boo">Your Name Here</a>.
      </div>
    </div>
  );
}

export default App;
