import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import { votes } from "./const/electoral-votes-map";
import { odds } from "./const/state-odds";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("each state should have a votes associated with it", () => {
  for (let odd of odds) {
    expect(votes[odd.stateId]).toBeGreaterThan(0);
  }
});
