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
];

const initializeData = () => {
  // get the todos from localstorage
  const savedTodos = localStorage.getItem("todos");
  // if there are todos stored
  if (savedTodos && savedTodos !== "[]") {
    // return the parsed JSON object back to a javascript object
    return JSON.parse(savedTodos);
    // otherwise
  } else {
    // return an empty array
    return initialData;
  }
};

const options = {
  name: "listItems",
  initialState: {
    listItems: initializeData(),
  },
  reducers: {
    addListItem(state, action) {
      state.listItems.push({
        id: String(uniqueId++),
        ...action.payload,
      });
    },
    removeListItem(state, action) {
      state.listItems = state.listItems.filter(
        (item) => item.id !== String(action.payload)
      );
    },
    reorderItems(state, action) {
      state.listItems = action.payload;
      return state;
    },
    applyFilter(state, action) {
      state.filteredListItems = action.payload;
    },
    completeItem(state, action) {
      let listItem = state.listItems.find(
        (item) => item.id === String(action.payload)
      );
      listItem.completed = !listItem.completed;
    },
    clearCompletedItems(state) {
      state.listItems = state.listItems.filter((item) => !item.completed);
    },
    resetList(state) {
      state.listItems = initialData;
    },
  },
};

const listItemsSlice = createSlice(options);

export function selectListItems(state) {
  return state.listItems.listItems;
}

export const {
  addListItem,
  removeListItem,
  reorderItems,
  applyFilter,
  completeItem,
  clearCompletedItems,
  resetList,
} = listItemsSlice.actions;

export default listItemsSlice.reducer;
