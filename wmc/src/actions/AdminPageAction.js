export const AddItemAction = (item) => (dispatch, getState) => {
    const {
        admin: { items }, // Ensure 'admin' matches your reducer name
    } = getState();

    if (!items) {
        console.error("Items are undefined in the state.");
        return;
    }

    const hasItem = items.find((i) => i.item === item.item); // Ensure item structure matches

    if (!hasItem && item !== "") {
        dispatch({
            type: "ADD_ITEM",
            payload: item, // Pass the new item directly
        });
    }
};


export const DeleteItemAction = (item) => (dispatch, getState) => {
    const {
        admin: { items }, // Ensure 'admin' matches your reducer name
    } = getState();

    // Filter out the item to be deleted from the state
    dispatch({
        type: "DELETE_ITEM",
        payload: item.id, // Only the ID of the item to delete
    });
};
