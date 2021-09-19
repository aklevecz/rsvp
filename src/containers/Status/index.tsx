import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { services } from "../..";
import Description from "./Description";
import StatusView from "./Status";

type State = {
  coming: boolean | null;
  contactHash: string | null;
  pizza: string | null;
  vice: string | null;
  view: Views;
};

type Action = {
  type: string;
  [x: string]: any;
};

enum Views {
  STATUS,
  DESCRIPTION,
}

const initialState = {
  coming: null,
  contactHash: null,
  pizza: null,
  vice: null,
  view: Views.STATUS,
};

// const mockState = {
//   coming: true,
//   contactHash: "chicken",
//   pizza: "pizza",
//   vice: "vice",
//   view: Views.DESCRIPTION,
// };

const INIT = "INIT";
const UPDATE = "UPDATE";
const CHANGE_VIEW = "CHANGE_VIEW";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case INIT:
      return { ...action.state, view: Views.STATUS };
    case UPDATE:
      return { ...state, ...action.update };
    case CHANGE_VIEW:
      return { ...state, view: action.view };
    default:
      return state;
  }
};

export default function Status() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [remoteState, setRemoteState] = useState<State>(initialState);
  const [error, setError] = useState<string | null>(null);
  const { uid } = useParams<{ uid: string }>();

  const handleChange = (e: any) => {
    const topic = e.target.parentElement.id;
    dispatch({ type: UPDATE, update: { [topic]: e.target.value } });
  };

  const update = () =>
    services.updateRaptor(state).then((data) => {
      setRemoteState(data);
      dispatch({ type: UPDATE, update: data });
    });

  const updateComing = (coming: boolean) =>
    services.updateRaptor({ coming }).then((data) => {
      setRemoteState({ ...remoteState, coming });
      dispatch({ type: UPDATE, update: data });
    });

  const changeView = (view: Views) => dispatch({ type: CHANGE_VIEW, view });

  const notComing = () => updateComing(false);
  const yesComing = () => updateComing(true);

  useEffect(() => {
    services
      .getRaptor(uid)
      .then((data) => {
        setRemoteState(data);
        dispatch({ type: INIT, state: data });
      })
      .catch((e) => {
        // setRemoteState(mockState);
        // dispatch({ type: INIT, state: mockState });
        setError(e.message);
      });
  }, [uid]);
  if (error) {
    return <div>{error}</div>;
  }

  if (state.coming === null) {
    return <div>loading...</div>;
  }
  return (
    <div className="status__container">
      <div className="status__nav">
        <a
          style={{
            color: state.view === Views.STATUS ? "grey" : "rgb(130, 130, 214)",
          }}
          onClick={() => changeView(Views.STATUS)}
        >
          Status
        </a>
        <a
          style={{
            color:
              state.view === Views.DESCRIPTION ? "grey" : "rgb(130, 130, 214)",
          }}
          onClick={() => changeView(Views.DESCRIPTION)}
        >
          Tl;dr
        </a>
      </div>
      {state.view === Views.STATUS && (
        <StatusView
          state={state}
          yesComing={yesComing}
          notComing={notComing}
          handleChange={handleChange}
          remoteState={remoteState}
          update={update}
        />
      )}
      {state.view === Views.DESCRIPTION && <Description />}
    </div>
  );
}
