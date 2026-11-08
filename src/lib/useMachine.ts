import { useCallback, useRef, useState } from "react";

export type MachineStep<S> = {
  previous: S;
  state: S;
};

/**
 * React binding for a pure transition function.
 * `send` applies the event against the latest state synchronously, so a
 * second call in the same turn sees the updated phase instead of a stale render.
 */
export function useMachine<S, E>(
  initial: S | (() => S),
  transition: (state: S, event: E) => S,
): [S, (event: E) => MachineStep<S>, (next: S) => void] {
  const [state, setState] = useState<S>(initial);
  const stateRef = useRef(state);
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const send = useCallback((event: E): MachineStep<S> => {
    const previous = stateRef.current;
    const next = transitionRef.current(previous, event);
    stateRef.current = next;
    setState(next);
    return { previous, state: next };
  }, []);

  const replace = useCallback((next: S) => {
    stateRef.current = next;
    setState(next);
  }, []);

  return [state, send, replace];
}
