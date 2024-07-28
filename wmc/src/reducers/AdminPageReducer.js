const initialState = {
    items: [],
    loading: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ITEMS":
            return { ...state, items: action.payload };
        case "ADD_ITEM":
            return { ...state, items: [action.payload, ...state.items] };
            case "DELETE_ITEM":
                return { ...state, items: state.items.filter(item => item.id !== action.payload) }; // Use ID to filter
        case "SHOW_LOADING":
            return { ...state, loading: true };
        case "HIDE_LOADING":
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default adminReducer;
