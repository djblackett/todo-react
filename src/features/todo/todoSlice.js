import { createSlice } from "@reduxjs/toolkit";

let uniqueId = 0;

const options = {
  name: "listItems",
  initialState: [
    { id: "1234", text: "Welcome to your new todo list", completed: false },
    {
      id: "1235",
      text: "Tap the sun to switch to light mode",
      completed: false,
    },
    {
      id: "12351",
      text: "Tap the circles to mark items completed",
      completed: false,
    },
    {
      id: "1236",
      text: "Careful now. Refreshing the page will reset the list... ",
      completed: false,
    },
  ],
  reducers: {
    addListItem(state, action) {
      state.push({
        id: uniqueId++,
        ...action.payload,
      });
      return state;
    },
    removeListItem(state, action) {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
};

const listItemsSlice = createSlice(options);

export function selectListItems(state) {
  return state.listItems;
}

// export function selectDefaultProduct(state) {
//   return state.listItems.filter((product) => product.id === 0);
// }

export const { addListItem, removeListItem } = listItemsSlice.actions;

export default listItemsSlice.reducer;
