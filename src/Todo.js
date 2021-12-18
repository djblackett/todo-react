import React, { useState, useEffect } from "react";

export function Todo(props) {
  return <TodoList data={props.data} />;
}

function TodoList(props) {
  const [dataFilter, setDataFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(props.data);

  useEffect(() => {
    if (dataFilter === "all") {
      setFilteredData(() => {
        return props.data;
      });
    } else if (dataFilter === "active") {
      setFilteredData(() => {
        return props.data.filter((entry) => entry.active === true);
      });
    } else if (dataFilter === "completed") {
      setFilteredData(() => {
        return props.data.filter((entry) => entry.completed === true);
      });
    }
  }, [dataFilter, props.data]);

  return (
    <div id="todo-list-container">
      {filteredData.map((item, i) => {
        return <ListItem key={i} text={filteredData[i].text} />;
      })}
      <ListInfo data={filteredData} />
    </div>
  );
}

function ListItem(props) {
  return (
    <div id="list-item">
      <div id="circle"></div>
      <p>{props.text}</p>
    </div>
  );
}

function ListInfo(props) {
  return (
    <div id="list-info">
      <p>{props.data.length} items left</p>
      <div id="completion-status">
        <p>all</p>
        <p>active</p>
        <p>completed</p>
      </div>
      <button id="clear-button">Clear Completed</button>
    </div>
  );
}

export function InputBar(props) {
  const [state, setState] = useState("");

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      let text = event.target.value;
      const newEntry = { text: text, completed: false, active: true };
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
