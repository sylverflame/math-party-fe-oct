export const operators = ["Add", "Subtract", "Multiply", "Divide"] as const;
export type Operator = (typeof operators)[number];

export type GameRound = {
  roundNumber: number;
  firstNumber: number;
  secondNumber: number;
  operator: Operator;
  solution?: number;
};
