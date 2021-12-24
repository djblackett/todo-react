import React from "react";

export function InputBar(props) {
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      let text = event.target.value;
      if (text === "") return;
      const newEntry = {
        id: String(Date.now()),
        text: text,
        completed: false,
        active: true,
      };
      props.handleInput(newEntry);
      document.getElementById("input").value = "";
    }
  };

  return (
    <div id="input-component">
      <div id="outer-circle">
        <div id="circle"></div>
      </div>
      <input
        id="input"
        type="text"
        placeholder="Create a new todo..."
        onKeyDown={(e) => handleEnterPress(e)}
      />
    </div>
  );
}
