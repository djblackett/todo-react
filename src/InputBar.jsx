import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode } from "./features/colorMode/colorModeSlice";
import { addListItem } from "./features/listItems/listItemsSlice";

function InputBar() {
  const dispatch = useDispatch();
  let mode = useSelector(selectColorMode);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      let text = event.target.value;
      if (text === "") return;
      const newEntry = {
        text: text,
        completed: false,
      };
      dispatch(addListItem(newEntry));
      document.getElementById("input").value = "";
    }
  };

  return (
    <div
      id="input-component"
      className={`input-component-${mode}`}
      tabIndex={-1}
    >
      <div id="outer-circle">
        <div id="circle" className={`circle-${mode}`}></div>
      </div>
      <input
        id="input"
        className={`input-${mode}`}
        type="text"
        placeholder="Create a new todo..."
        onKeyDown={(e) => handleEnterPress(e)}
      />
    </div>
  );
}

export default InputBar;
