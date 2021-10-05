import { createContext, useContext, useReducer } from "react";

type Action =
  | { type: "OPEN" }
  | { type: "TOGGLE" }
  | { type: "SET_TITLE"; title: string };

type Dispatch = (action: Action) => void;

type State = {
  open: boolean;
  title: string;
};

const initialState = {
  open: false,
  title: "RSVP",
};

const ModalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, open: !state.open };
    case "OPEN":
      return { ...state, open: true };
    case "SET_TITLE":
      return { ...state, title: action.title };
    default:
      return state;
  }
};

const ModalProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

export const useModalToggle = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("Modal Context error in Modal hook");
  }

  const { dispatch, state } = context;

  const toggleModal = () => dispatch({ type: "TOGGLE" });
  const setTitle = (title: string) => dispatch({ type: "SET_TITLE", title });

  return { toggleModal, setTitle };
};

export const useModalState = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("Modal Context error in ModalState hook");
  }

  const { state } = context;
  return state;
};
