import { useEffect, useReducer } from "react";
import { changeAll } from "../../actions";
import Prompt from "./Prompt";
import Responses from "./Responses";
import Top from "./Top";

export const CHANGE_STATE = "CHANGE_STATE";

type Change = {
  section: "top" | "prompt" | "responses";
  state: number;
};

type Action = {
  type: string;
  changes?: Change[];
  state?: State;
};

type State = {
  top: { state: number };
  prompt: { state: number };
  responses: { state: number };
  routeHistory: Array<State>;
};

const sectionsReducer = (changes: Change[]) =>
  changes.reduce((acc: Change | {}, curr: Change) => {
    return { ...acc, [curr.section]: { state: curr.state } };
  }, {});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case CHANGE_STATE:
      const sections = sectionsReducer(action.changes!);
      window.history.pushState({}, "", "");
      return { ...state, ...sections, history: state.routeHistory.push(state) };
    case "FORCE_STATE": {
      state.routeHistory.pop();
      return { ...state, ...action.state, history: state.routeHistory };
    }
    default:
      return state;
  }
}

const sState = 0;
const initialState = {
  top: { state: sState },
  prompt: { state: sState },
  responses: { state: sState },
  routeHistory: [],
};
export default function Questions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    window.onpopstate = (e: any) => {
      dispatch({
        type: "FORCE_STATE",
        state: state.routeHistory[state.routeHistory.length - 1],
      });
    };
  }, [state.routeHistory]);

  useEffect(() => {
    if (window.location.pathname.includes("details")) {
      changeAll(dispatch, 3);
    }
  }, []);
  return (
    <div>
      <Top top={state.top} />
      <Prompt prompt={state.prompt} />
      <Responses responses={state.responses} dispatch={dispatch} />
    </div>
  );
}
