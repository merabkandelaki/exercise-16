const fishesReducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_FISHES":
      return {
        ...state,
        fishList: action.payload,
      };
    case "ADD_FISH":
      return {
        ...state,
        fishList: [...state.fishList, action.payload],
      };
    case "REMOVE_FISH":
      return {
        ...state,
        fishList: state.fishList.filter((fish) => fish.id !== action.payload),
      };

    case "UPDATE_FISH":
      return {
        ...state,
        fishList: state.fishList.map((fish) =>
          fish.id === action.payload.id ? action.payload : fish
        ),
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default fishesReducer;
