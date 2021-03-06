import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";
import  {Provider}  from "react-redux";
import store from "../features/app/store";

test("renders the entire application", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const appElement = screen.getByTestId(/app-component-test/i);
  expect(appElement).toBeInTheDocument();
});
