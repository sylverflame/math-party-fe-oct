export const operators = ["Add", "Subtract", "Multiply", "Divide"] as const;
export type Operator = (typeof operators)[number];

export type GameRound = {
  roundNumber: number;
  firstNumber: number;
  secondNumber: number;
  operator: Operator;
  solution?: number;
};

const events = {
  NEXT_ROUND_RECIEVED: "NEXT_ROUND_RECIEVED",
} as const;

export type AppEvent = (typeof events)[keyof typeof events];

export enum ScreenSizes {
  SMALL = 640,
  MEDIUM = 768,
  LARGE = 1024
}
