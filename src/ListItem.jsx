import React from "react";
import { PropTypes } from "prop-types";
import { ReactComponent as Check } from "./svg/icon-check.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectColorMode } from "./features/colorMode/colorModeSlice";
import {
  completeItem,
  removeListItem,
} from "./features/listItems/listItemsSlice";

const crossIconD =
  "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z";

function ListItem(props) {
  const mode = useSelector(selectColorMode);
  const dispatch = useDispatch();
  let completed = props.completed;
  let completeStatus = completed ? "complete" : "active";
  let circleVisible = completed ? "hidden" : "active";
  let checkVisible = completed ? "visible" : "hidden";

  return (
    <div
      // tabIndex={0}
      id="list-item"
      className={`list-item-${mode}-${completeStatus}`}
    >
      <div
        tabIndex={0}
        id="outer-circle"
        onClick={() => dispatch(completeItem(props.index))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(completeItem(props.index));
          }
        }}
      >
        <div
          tabIndex={-1}
          id="circle"
          className={`circle-${mode} circle-${circleVisible}`}
        >
          <Check id="check" className={`check-${checkVisible}`} />
        </div>
      </div>
      <p tabIndex={-1} id="list-item-text" className="dark">
        {props.text}
      </p>
      <svg
        tabIndex={0}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        id="crossIcon"
        onClick={() => dispatch(removeListItem(props.index))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(removeListItem(props.index));
          }
        }}
      >
        <path fill="#494C6B" fillRule="evenodd" d={crossIconD} />
      </svg>
    </div>
  );
}

ListItem.propTypes = {
  text: PropTypes.string,
  completed: PropTypes.bool,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  completeItem: PropTypes.func,
};

export default ListItem;
