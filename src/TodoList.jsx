import React, { useState, useEffect } from "react";
import { ListInfo } from "./ListInfo";
import { ListItem } from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {useSelector, useDispatch} from 'react-redux';
import { selectDataFilter } from "./features/dataFilter/dataFilterSlice";
import { selectListItems, reorderItems } from "./features/listItems/listItemsSlice";
import { selectColorMode } from "./features/colorMode/colorModeSlice";


export function TodoList() {
  
  const mode = useSelector(selectColorMode);
  const listItems = useSelector(selectListItems);
  const dispatch = useDispatch();
  const dataFilterStore = useSelector(selectDataFilter);
  const [filteredData, setFilteredData] = useState(listItems);
  const [dataFilter, setDataFilter] = useState(dataFilterStore);
  
  
  const handleOnDragEnd = (result) => {
    const items = Array.from(filteredData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderItems(items));
    setFilteredData(() => {
      return items;
    });
  };


  // Modified this guy's code for local storage:
  // https://dev.to/joelynn/how-to-build-a-react-crud-todo-app-localstorage-4pjh
  
  // useEffect to run once the component mounts
  useEffect(() => {
    // localstorage only support storing strings as keys and values
    // - therefore we cannot store arrays and objects without converting the object
    // into a string first. JSON.stringify will convert the object into a JSON string
    // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem("todos", JSON.stringify(listItems));
    // add the todos as a dependancy because we want to update the
    // localstorage anytime the todos state changes
  }, [listItems]);



  useEffect(() => {
    // Every time the list or filter changes, the list gets refiltered to match the new filter/list
    if (dataFilter === "all") {
      setFilteredData(() => {
        return listItems;
      });
      
    } else if (dataFilter === "active") {
      setFilteredData(() => {
        return listItems.filter((entry) => entry.completed === false);
      });
      
    } else if (dataFilter === "completed") {
      setFilteredData(() => {
        return listItems.filter((entry) => entry.completed === true);
    })
    
  } else {
      return [];
    }
  }, [listItems, dataFilter]);


  const handleListChange = (e) => {
    // Handles the style changes based on the selection in the info pane
    // Can likely be refactored to embed the dataFilter directly into the ListInfo's JSX elements

    let element = e.target;
    let all = document.getElementById("list-all");
    let active = document.getElementById("list-active");
    let completed = document.getElementById("list-completed");

    if (element === all) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", `list-option list-option-unselected-${mode}`);
      completed.setAttribute("class", `list-option list-option-unselected-${mode}`);
      setDataFilter(() => {
        return "all";
      });
      
    } else if (element === active) {
      element.setAttribute("class", "list-option list-option-selected");
      all.setAttribute("class", `list-option list-option-unselected-${mode}`);
      completed.setAttribute("class", `list-option list-option-unselected-${mode}`);
      setDataFilter(() => {
        return "active";
      });
      
    } else if (element === completed) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", `list-option list-option-unselected-${mode}`);
      all.setAttribute("class", `list-option list-option-unselected-${mode}`);
      setDataFilter(() => {
        return "completed";
      });
    }
  };

  return (
    <div id="todo-list-container" className={`todo-list-container-${mode}`}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredData.map((item, i) => {
                return (
                  <Draggable
                    key={item.id}
                    index={i}
                    draggableId={String(item.id)}
                    id="inner-list-container"
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem
                          text={item.text}
                          index={Number(item.id)}
                          completed={item.completed}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ListInfo
        listChange={handleListChange}
      />
    </div>
  );
}