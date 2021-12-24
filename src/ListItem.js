import React, { useState, useEffect } from "react";
import { ReactComponent as Check } from "./svg/icon-check.svg";

export const ListItem = (props) => {

  const [state, setState] = useState({
    text: props.text,
    completed: props.completed,
    active: props.active,
  });

  const handleCheck = (e) => {
    let check = e.target.lastChild;
    // #CACDE8
    // let darkActiveTextColor = 'hsl(234, 39%, 85%)';
    let darkActiveTextColor = 'rgb(202, 205, 232)';
    
    // let darkInactiveTextColor = 'hsl(233, 14%, 35%)';
    let darkInactiveTextColor = 'rgb(77, 80, 102)';
    // #4D5066
    console.log(check);
    let isVisible = check.style.visibility;
    console.log(isVisible);
    check.style.visibility =
      getComputedStyle(check).visibility === "hidden" ? "visible" : "hidden";

    // setState((prev) => {
    //   return { ...prev, completed: !state.completed };
    // });

    props.completeItem(state);
    console.log(e.target.parentNode);

    let textElement = e.target.nextElementSibling;

    console.log(textElement.style.textDecoration);
    textElement.style.textDecoration =
      textElement.style.textDecoration === "line-through"
        ? "initial"
        : "line-through";

        textElement.style.color = textElement.style.color === darkActiveTextColor ? darkInactiveTextColor : darkActiveTextColor;
        console.log(textElement.style.color);

    let innerCircle = e.target.firstChild.children[0];
    let isCircleVisible = getComputedStyle(innerCircle).visibility;
    innerCircle.style.visibility =
      isCircleVisible === "hidden" ? "visible" : "hidden";
  };


  return (
    <div id="list-item"     >
      <div id="outer-circle" onClick={handleCheck} >
        <div
          id="circle"
          
          style={{ visibility: "visible" }}
        >
          <Check id="check" style={{ visibility: "hidden" }} />
        </div>
      </div>
      <p id="list-item-text" style={{color: 'rgb(202, 205, 232)'}}>{state.text}</p>
    </div>
  );
}
