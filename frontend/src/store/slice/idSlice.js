import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collectionIds: [],
  itemIds: [],
};

const idSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
      addCollectionId(state, action) {
        state.collectionIds.push(action.payload);
      },
      removeCollectionId(state, action) {
        state.collectionIds = state.collectionIds.filter(id => id !== action.payload);
      },
      addItemId(state, action) {
        state.itemIds.push(action.payload);
      },
      removeItemId(state, action) {
        state.itemIds = state.itemIds.filter(id => id !== action.payload);
      },
    }
  });

export const { addCollectionId, removeCollectionId, addItemId, removeItemId } = idSlice.actions;

export default idSlice.reducer;
