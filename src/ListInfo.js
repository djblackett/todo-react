import React from "react";

export function ListInfo(props) {
  const flashRed = (e) => {
    console.log(e);
    let element = e.target;

    console.log(element);
    let currentColor = String(element.style.color);
    element.style.color = "red";
    setTimeout(() => {
      element.style.color = currentColor;
    }, 200);
  };

  const clickFunctions = (e) => {
    flashRed(e);
    props.clearCompleted();
  };

  return (
    <div id="list-info">
      <p>{props.data.length} items left</p>
      <div id="completion-status">
        <p id="list-all" className="list-option" onClick={props.listChange}>
          all
        </p>
        <p id="list-active" className="list-option" onClick={props.listChange}>
          active
        </p>
        <p
          id="list-completed"
          className="list-option"
          onClick={props.listChange}
        >
          completed
        </p>
      </div>
      <button id="clear-button" onClick={clickFunctions}>
        Clear Completed
      </button>
    </div>
  );
}
