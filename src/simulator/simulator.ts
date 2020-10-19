import { votes } from "../const/electoral-votes-map";

export interface Odd {
  stateId: string;
  trumpChance: string;
  bidenChance: string;
}

export interface WithWinner extends Odd {
  winner: "trump" | "biden";
}

export interface TotalVotes {
  trump: number;
  biden: number;
}

export const simulateWinner = (odds: Odd[]): WithWinner[] =>
  odds.map((odd) => {
    const winner =
      Math.random() <= parseFloat(odd.trumpChance) ? "trump" : "biden";
    return { ...odd, winner };
  });

export const getTotalVotes = (withWinners: WithWinner[]): TotalVotes =>
  withWinners.reduce(
    (prev, w) => {
      const numVotes = votes[w.stateId];
      if (w.winner === "biden") {
        prev.biden += numVotes;
      } else {
        prev.trump += numVotes;
      }
      return prev;
    },
    { trump: 0, biden: 0 }
  );
