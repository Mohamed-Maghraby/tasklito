import { useReducer } from "react";
import { createContainer } from "react-tracked";

const initialState = {
  tasks: [],
  filterOption: '',
  isStorageLoaded: false,
  pending: false,
  error: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING_START": {
      return {
        ...state,
        pending: true,
      };
    }
    case "LOADING_SUCCESS": {
      return {
        ...state,
        tasks: action.payload,
        isStorageLoaded: true,
        pending: false,
      };
    }
    case "LOADING_FAILED": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      };
    }
    case "EDIT_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    }
    case "TOGGLE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    }
    case "SAVE_TASKS": {
      if (state.isStorageLoaded) {
        console.log("Local Set");
        localStorage.setItem("Tasks", JSON.stringify(state.tasks));
      }
      return {
        ...state,
        pending: false,
      };
    }
    case 'FILTER_TASKS': {
      return {
        ...state,
        filterOption: action.payload
      }
    }
  }
}

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);

