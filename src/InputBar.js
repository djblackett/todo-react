import React, { useState } from "react";

export function InputBar(props) {
  const [state, setState] = useState("");

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
    <input
      id="input"
      type="text"
      placeholder="Enter your next todo"
      onKeyDown={(e) => handleEnterPress(e)}
    />
  );
}
