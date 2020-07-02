import UiTypes from "./ui.types";

export interface State {
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE = {
  loading: false,
};

const UiReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    ////////////////////SET_LOADING
    case UiTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    ////////////STOP_LOADING
    case UiTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default UiReducer;
