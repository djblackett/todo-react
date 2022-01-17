import React from "react";
import { useDispatch } from "react-redux";
import { addListItem } from "./features/listItems/listItemsSlice";

export function InputBar() {
  const dispatch = useDispatch();

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
    <div id="input-component" className="input-component-dark dark">
      <div id="outer-circle">
        <div id="circle" className="circle-dark"></div>
      </div>
      <input
        id="input"
        className="input-dark dark"
        type="text"
        placeholder="Create a new todo..."
        onKeyDown={(e) => handleEnterPress(e)}
      />
    </div>
  );
}
