import "./sass/App.scss";
import { TodoList } from "./TodoList";
import { InputBar } from "./InputBar";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectColorMode,
  selectImage,
} from "./features/colorMode/colorModeSlice";
import { resetList } from "./features/listItems/listItemsSlice";
import { toggleColorMode } from "./features/colorMode/colorModeSlice";

function App() {
  const mode = useSelector(selectColorMode);
  const image = useSelector(selectImage);
  const dispatch = useDispatch();

  function handleLogoChange() {
    dispatch(toggleColorMode());
    let html = document.querySelector("body");
    html.style.backgroundColor =
      mode === "light" ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)"; // dark or light background color
  }

  return (
    <div className="App">
      <div className={`background-img-${mode}`} id="background-img"></div>
      <header>
        <h1>TODO</h1>
        <div id="svgContainer" onClick={handleLogoChange}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path fill="#FFF" fillRule="evenodd" d={image} />
          </svg>
        </div>
      </header>
      <InputBar />
      <TodoList />
      <p className="drag">Drag and drop to reorder list</p>
      <div className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">David Andrea</a>.
      </div>
      <button
        className={`reset-${mode}`}
        id="reset"
        onClick={() => dispatch(resetList())}
      >
        Reset todo list
      </button>
    </div>
  );
}

export default App;
