import "./sass/App.scss";
import { Todo } from "./Todo";
import { InputBar } from "./InputBar";
import React, { useState } from "react";
import { ReactComponent as MoonLogo } from "./svg/icon-moon.svg";
import { ReactComponent as SunLogo } from "./svg/icon-sun.svg";

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

const vectorImages = {moon: "M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z",
    sun: "M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
}

function App() {
  const [data, setData] = useState(initialData);

  const [mode, setMode] = useState({
    mode: "dark", image: vectorImages.moon
    
  });

  const handleLogoChange = () => {
    console.log("logo trigger clicked");
    if (mode.image === vectorImages.moon) {
      console.log("moon");
      setMode(() => {
        return {mode: 'light', image: vectorImages.sun}
      });
    } else {
      console.log("sun");
      setMode(() => {
        return {mode: 'dark', image: vectorImages.moon}
      });
    }
  };

  const handleInputData = (inputData) => {
    setData(() => {
      return [...data, inputData];
    });
  };

  const handleClearCompleted = () => {
    const arrayCopy = [...data];
    let notCompleted = arrayCopy.filter((elem) => !elem.completed);
    setData(() => notCompleted);
  };

  const handleDeleteItem = (id) => {
    const arrayCopy = [...data];
    let newArray = arrayCopy.filter((elem) => elem.id !== id);
    setData(() => newArray);

  }

  const handleReorderData = (newOrder) => {
    setData(() => newOrder);
  };

  const handleCompleteItem = (completedItemId) => {
    const arrayCopy = [...data];
    let element = arrayCopy.filter((item) => item.id === completedItemId)[0];
    if (element) {
      console.log(element);
      element.completed = !element.completed;
    }

    console.log(arrayCopy);
    setData(() => arrayCopy);
  };

  return (
    <div className="App">
      <div id="background-img"></div>
      <header>
        <h1>TODO</h1>
          <div id="svgContainer"
          onClick={handleLogoChange}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" onClick={handleLogoChange}>
        <path
          fill="#FFF"
          fillRule="evenodd"
          d={mode.image} /></svg>
          </div>
      </header>
      <InputBar handleInput={handleInputData} />
      <Todo
        data={data}
        reorderData={handleReorderData}
        completeItem={handleCompleteItem}
        clearCompleted={handleClearCompleted}
        deleteItem={handleDeleteItem}
      />

      <p className="drag">Drag and drop to reorder list</p>
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
