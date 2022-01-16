import { createSlice } from "@reduxjs/toolkit";

let uniqueId = 0;
const initialData = [
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
];
const options = {
  name: "listItems",
  initialState: {
    listItems: initialData,
    filteredListItems: initialData,
  },
  reducers: {
    addListItem(state, action) {
      state.listItems.push({
        id: uniqueId++,
        ...action.payload,
      });
      return state;
    },
    removeListItem(state, action) {
      return state.filter((product) => product.id !== action.payload.id);
    },
    reorderItems(state, action) {
      state.listItems = action.payload;
      return state;
    },
  },
};

const listItemsSlice = createSlice(options);

export function selectListItems(state) {
  return state.listItems.listItems;
}

export function selectFilteredListItems(state) {
  return state.listItems.filteredListItems;
}

// export function selectDefaultProduct(state) {
//   return state.listItems.filter((product) => product.id === 0);
// }

export const { addListItem, removeListItem, reorderItems } =
  listItemsSlice.actions;

export default listItemsSlice.reducer;
