import "./App.css";
import { Todo } from "./Todo";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Todo</h1>
      </header>
      <section id="input">
        <input type="text" placeholder="Placeholder text for doto list input" />
      </section>
      <Todo />
      {/* Add dynamic number */}
      items left All Active Completed Clear Completed Drag and drop to reorder
      list
      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#boo">Your Name Here</a>.
      </div>
    </div>
  );
}

export default App;
