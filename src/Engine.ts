import React from "react";

interface Input {
  src: string;
  outW: number;
  outH: number;
}

export interface Engine {
  (input: Input): Promise<string>;
}

const NoopEnegine: Engine = (input: Input) => Promise.resolve(input.src);

export const Context = React.createContext<Engine>(NoopEnegine);

export function useEngine() {
  return React.useContext(Context);
}
