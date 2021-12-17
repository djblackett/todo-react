import React from "react";

const data = [
  { text: "I am a list item", completed: false },
  { text: "Take out the trash", completed: false },
  { text: "Blah blah blah. Computer stuff. Blah!", completed: false },
];

//todo create function to take text from input and create a new todo list item from it

export function Todo() {
  return <TodoList />;
}

function TodoList(props) {
  return (
    <div id="todo-list-container">
      {data.map((item, i) => {
        return <ListItem key={i} text={data[i].text} />;
      })}
      <ListInfo />
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
      <p>{props.numberOfItems} items left</p>
      <div id="completion-status">
        <p>all</p>
        <p>active</p>
        <p>completed</p>
      </div>
      <div id="action">
        <p>Clear</p>
        <p>Completed</p>
      </div>
    </div>
  );
}

// ReactDOM.render(<Todo />, document.getElementById("list"));
