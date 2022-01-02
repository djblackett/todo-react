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

  const handleItemsLeft = () => {
    return props.data.filter((item) => !item.completed).length;
  };

  const getModeClass = () => {
    return "list-option list-option-unselected-" + props.mode;
  };

  const getClearButtonMode = () => {
    return "clear-button-" + props.mode;
  };

  return (
    <div id="list-info" class="list-info-dark">
      <p>{handleItemsLeft()} items left</p>
      <div id="completion-status">
        <p
          id="list-all"
          className="list-option list-option-selected"
          onClick={props.listChange}
        >
          All
        </p>
        <p
          id="list-active"
          className={getModeClass()}
          onClick={props.listChange}
        >
          Active
        </p>
        <p
          id="list-completed"
          className={getModeClass()}
          onClick={props.listChange}
        >
          Completed
        </p>
      </div>
      <button
        id="clear-button"
        class={getClearButtonMode()}
        onClick={clickFunctions}
      >
        Clear Completed
      </button>
    </div>
  );
}
