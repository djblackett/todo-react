import "./sass/App.scss";
import { Todo } from "./Todo";
import { InputBar } from "./InputBar";
import React, { useState, useEffect } from "react";
import { ReactComponent as MoonLogo } from "./svg/icon-moon.svg";

const initialData = [
  { id: "1234", text: "I am a list item", completed: false, active: true },
  { id: "1235", text: "Take out the trash", completed: false, active: true },
  {
    id: "1236",
    text: "Blah blah blah. Computer stuff. Blah!",
    completed: false,
    active: true,
  },
];

function App() {
  const [data, setData] = useState(initialData);

  const handleInputData = (inputData) => {
    setData(() => {
      return [...data, inputData];
    });
  };

  const handleReorderData = (newOrder) => {
    setData(() => newOrder);
  };

  //blarghhhhh
  const handleCompleteItem = (completedItem) => {
    const arrayCopy = [...data];
    for (let e of arrayCopy) {
      if (e.id === completedItem.id) {
        console.log(e);
        let index = arrayCopy.indexOf(e);
        e[index] = !completedItem.completed;
      }
    }
    console.log(arrayCopy);
    setData(() => arrayCopy);
  };

  return (
    <div className="App">
      <div id="background-img"></div>
      <header>
        <h1>TODO</h1>
        <MoonLogo />
      </header>
      <InputBar handleInput={handleInputData} />
      <Todo
        data={data}
        reorderData={handleReorderData}
        completeItem={handleCompleteItem}
      />
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
