import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
  itemIds: [],
};

const idSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
      addCollection(state, action) {
        state.collections.push({ id: action.payload._id, name: action.payload.name });
      },
      removeCollection(state, action) {
        state.collections = []
      },
      addItemId(state, action) {
        state.itemIds.push(action.payload);
      },
      removeItemId(state, action) {
        state.itemIds = state.itemIds.filter(id => id !== action.payload);
      },
    }
});

export const { addCollection, removeCollection, addItemId, removeItemId } = idSlice.actions;

export default idSlice.reducer;
