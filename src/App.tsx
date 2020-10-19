import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./App.css";
import {
  getTotalVotes,
  simulateWinner,
  TotalVotes,
  WithWinner,
} from "./simulator/simulator";
import { odds } from "./const/state-odds";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface State {
  withWinners: WithWinner[];
  totals: TotalVotes;
}

const INITIAL_STATE: State = {
  withWinners: [],
  totals: { trump: 0, biden: 0 },
};

function App() {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const lookupFill = (name) => {
    const usState = state.withWinners.find((w) => w.stateId === name);
    if (usState) {
      if (usState.winner === "biden") {
        return "blue";
      } else {
        return "red";
      }
    }
    return "#DDD";
  };

  return (
    <div style={{ width: 375 }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill={lookupFill(geo.properties.name)}
                  />
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      <h2>Biden: {state.totals.biden}</h2>
      <h2>Trump: {state.totals.trump}</h2>
      <h1>
        {state.totals.biden > state.totals.trump ? "Biden" : "Trump"} Wins!
      </h1>
      <button
        onClick={() => {
          const { withWinners, totals } = simulateElection();
          setState({ withWinners, totals });
        }}
      >
        SPIN
      </button>
      <br />
      <button
        onClick={() => {
          while (true) {
            const { withWinners, totals } = simulateElection();
            if (totals.trump > totals.biden) {
              setState({ withWinners, totals });
              break;
            }
          }
        }}
      >
        SPIN UNTIL TRUMP WINS
      </button>
      <br />
      <button
        onClick={() => {
          const { withWinners, totals } = simulateElection();
          setState({ withWinners, totals });
        }}
      >
        SPIN UNTIL BIDEN WINS
      </button>
    </div>
  );

  function simulateElection() {
    const withWinners = simulateWinner(odds);
    const totals = getTotalVotes(withWinners);
    return { withWinners, totals };
  }
}

export default App;
