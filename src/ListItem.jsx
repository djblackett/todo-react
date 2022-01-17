import React, {useState, useEffect }from "react";
import { PropTypes } from 'prop-types';
import { ReactComponent as Check } from "./svg/icon-check.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectColorMode } from "./features/colorMode/colorModeSlice";
import { completeItem, removeListItem } from "./features/listItems/listItemsSlice";

const crossIconD =
  "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z";

export function ListItem(props) {
  // define styles in objects, then place in larger object to switch between light and dark mode

  const mode = useSelector(selectColorMode).colorMode;
  const dispatch = useDispatch();
  const [innerCircle, setInnerCircle] = useState("");

  const handleCheck = (e) => {
    // props.completeItem(props.index);
    dispatch(completeItem(props.index));

    let listItem = e.target.parentNode;
    let circle = e.target.querySelector("#circle");
    let check = e.target.querySelector("#check");

    let classArray = String(circle.className).split(" ");
    // let mode = classArray[0];
    let status = classArray[1];
    status = status === "circle-hidden" ? "circle-visible" : "circle-hidden";

    // circle.className = mode + " " + status;
    circle.setAttribute('class', "circle-" + mode + " " + status);
    let checkStatus =
      check.getAttribute("class") === "check-hidden"
        ? "check-visible"
        : "check-hidden";

    check.setAttribute("class", checkStatus);
    console.log(checkStatus);
    console.log(circle.className);

    if (listItem.className === "list-item-dark-active") {
      listItem.className = "list-item-dark-complete";
    } else if (listItem.className === "list-item-dark-complete") {
      listItem.className = "list-item-dark-active";
    } else if (listItem.className === "list-item-light-active") {
      listItem.className = "list-item-light-complete";
    } else if (listItem.className === "list-item-light-complete") {
      listItem.className = "list-item-light-active";
    }
  };

  const handleCrossClick = () => {
    dispatch(removeListItem(props.index));
    // props.deleteItem(props.index);
  };

  // not the cleanest code :(
  // Basically, trying to keep track of the mode (light/dark) and whether the current list item is marked as completed
  // this determines whether the innercircle should render and what color it is. It also takes care of the checkmark
  // it achieves this functionality by manipulating the classes of the elements.





  // the classes are recalculated after every change in props.mode or props.completed
  // then injected into the jsx inside the outer circle element

  useEffect(() => {
    if (mode === "dark") {
      setInnerCircle(() => {
        return props.completed ? (
          <div id="circle" className="circle-dark circle-hidden">
            <Check id="check" className="check-visible" />
          </div>
        ) : (
          <div id="circle" className="circle-dark circle-visible">
            <Check id="check" className="check-hidden" />
          </div>
        );
      })
    } else {
      setInnerCircle(() => {
        return props.completed ? (
          <div id="circle" className="circle-light circle-hidden">
            <Check id="check" className="check-visible" />
          </div>
        ) : (
          <div id="circle" className="circle-light circle-visible">
            <Check id="check" className="check-hidden" />
          </div>
        );
      })
    } 
  }, []);

  const classMode = () => {
    let s = `list-item-${mode}-`;
    let end = props.completed ? "complete" : "active";
    return s + end;
  };

  return (
    <div id="list-item" className={classMode()}>
      <div id="outer-circle" onClick={handleCheck}>
        {innerCircle}
      </div>
      <p id="list-item-text" className="dark">
        {props.text}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        id="crossIcon"
        onClick={handleCrossClick}
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
  completeItem: PropTypes.func
}