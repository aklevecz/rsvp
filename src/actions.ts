import { CHANGE_STATE } from "./containers/Questions";

export const changeAll = (dispatch: any, state: number) =>
  dispatch({
    type: CHANGE_STATE,
    changes: [
      { section: "top", state },
      { section: "prompt", state },
      { section: "responses", state },
    ],
  });
