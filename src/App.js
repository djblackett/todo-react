import "./sass/App.scss";
import { Todo } from "./Todo";
import { InputBar } from "./InputBar";
import React, { useState } from "react";

const initialData = [
  { id: "1234", text: "Welcome to your new todo list", completed: false},
  { id: "1235", text: "Tap the sun to switch to light mode", completed: false},
  {id: "12351", text: "Tap the circles to mark items completed", completed: false},
  {
    id: "1236",
    text: "Careful now. Refreshing the page will reset the list... ",
    completed: false
  }
  
];

const vectorImages = {moon: "M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z",
    sun: "M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
}

function App() {
  const [data, setData] = useState(initialData);

  const [mode, setMode] = useState({
    mode: "dark", image: vectorImages.sun
    
  });

  const handleLogoChange = () => {
    console.log("logo trigger clicked");
    let backgroundImage = document.querySelector("#background-img");
    let input = document.querySelector('#input');
    let inputContainer = document.querySelector("#input-component");
    let circles = document.querySelectorAll('#circle');
    let html = document.querySelector('body');
    let listItems = document.querySelectorAll("#list-item");
    let listInfo = document.querySelector("#list-info");
    let listContainer = document.querySelector("#todo-list-container");
  


    if (mode.image === vectorImages.moon) {

       setMode(() => {
        return {mode: 'dark', image: vectorImages.sun}
      });
      
      // dark mode
  
      
      backgroundImage.className = 'background-img-dark';
      input.className = 'input-dark';
      inputContainer.className = 'input-component-dark';
      circles.forEach(node => node.className = 'circle-dark');
      html.style.backgroundColor = 'hsl(235, 21%, 11%)'; // $darkBackground
      listItems.forEach(node => {
        
          let beginning = "list-item-";
          let classPieces = node.className.split("-");
          let end = classPieces[3];

        
        node.className = beginning + 'dark-' + end;
      });
      listInfo.className = 'list-info-dark';
      listContainer.className = 'todo-list-container-dark';

    } else {
      
     

      setMode(() => {
        return {mode: 'light', image: vectorImages.moon}
      });

      // light mode
      backgroundImage.className = 'background-img-light';
      input.className = 'input-light';
      inputContainer.className = 'input-component-light';
      circles.forEach(node => node.className = 'circle-light');
      html.style.backgroundColor = 'hsl(236, 33%, 92%)'; // $lightAppBackground
      listItems.forEach(node => {
        
          let beginning = "list-item-";
          let classPieces = node.className.split("-");
          let end = classPieces[3];

        
        node.className = beginning + 'light-' + end;
      });
      listInfo.className = 'list-info-light';
      listContainer.className = 'todo-list-container-light';

      // const elements = document.querySelectorAll(".dark");
      // elements.forEach(node => node.className = 'light');
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
      <div class="background-img-dark dark" id="background-img"></div>
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
        mode={mode.mode}
      />

      <p className="drag">Drag and drop to reorder list</p>
      <div className="attribution">
        Challenge by {' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
            Frontend Mentor
        </a>
        . Coded by <a href="#boo">David Andrea</a>.
      </div>
    </div>
  );
}

export default App;
