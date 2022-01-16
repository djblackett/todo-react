import React from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectColorMode } from "./features/colorMode/colorModeSlice";
import { selectListItems } from "./features/listItems/listItemsSlice";
import { changeFilter } from "./features/dataFilter/dataFilterSlice";

export function ListInfo(props) {
  const mode = useSelector(selectColorMode);
  const listItems = useSelector(selectListItems);
  const dispatch = useDispatch;

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
    return listItems.filter((item) => !item.completed).length;
  };

  const getModeClass = () => {
    return "list-option list-option-unselected-" + mode;
  };

  const getClearButtonMode = () => {
    return "clear-button-" + mode;
  };

  return (
    <div id="list-info" className="list-info-dark">
      <p>{handleItemsLeft()} items left</p>
      <div id="completion-status">
        <p
          id="list-all"
          className="list-option list-option-selected"
          onClick={() => dispatch(changeFilter("all"))}
        >
          All
        </p>
        <p
          id="list-active"
          className={getModeClass()}
          onClick={() => dispatch(changeFilter("active"))}
        >
          Active
        </p>
        <p
          id="list-completed"
          className={getModeClass()}
          onClick={() => dispatch(changeFilter("completed"))}
        >
          Completed
        </p>
      </div>
      <button
        id="clear-button"
        className={getClearButtonMode()}
        onClick={clickFunctions}
      >
        Clear Completed
      </button>
    </div>
  );
}

ListInfo.propTypes = {
  listChange: PropTypes.func,
  clearCompleted: PropTypes.func,
};
