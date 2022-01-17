import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { ListInfo } from "./ListInfo";
import { ListItem } from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {useSelector, useDispatch} from 'react-redux';
import { selectDataFilter } from "./features/dataFilter/dataFilterSlice";
import { selectListItems, reorderItems, applyFilter, } from "./features/listItems/listItemsSlice";
import { selectColorMode } from "./features/colorMode/colorModeSlice";


//todo I think useEffect is redundant here. It is probably causing extra rerenders. If I put all data in redux store
//todo and have a 2nd object of filtered data which gets rendered, I won't need to check with useEffect anymore 

export function TodoList(props) {
  // const [dataFilter, setDataFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(props.data);

  const mode = useSelector(selectColorMode);
  const listItems = useSelector(selectListItems);
  const dispatch = useDispatch();


 

  // const filteredListItems = useSelector(selectFilteredListItems);
  
  const dataFilter = useSelector(selectDataFilter);

  // console.log(dataFilter);

  const handleOnDragEnd = (result) => {
    const items = Array.from(filteredData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderItems(items));
  };

  useEffect(() => {
    if (dataFilter === "all") {
      setFilteredData(() => {
        return listItems;
      })
    } else if (dataFilter === "active") {
      setFilteredData(() => {
        return listItems.filter((entry) => entry.completed === false);
      })
    } else if (dataFilter === "completed") {
      setFilteredData(() => {
        return listItems.filter((entry) => entry.completed === true);
    })
  } else {
      return [];
    }
    console.log("useEffect called render()");
  }, [dataFilter, listItems]);

  //console.log(filteredData());

  const getModeClass = () => {
    return "list-option list-option-unselected-" + mode;
  };

  const handleListChange = (e) => {
    let element = e.target;
    let all = document.getElementById("list-all");
    let active = document.getElementById("list-active");
    let completed = document.getElementById("list-completed");

    if (element === all) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", getModeClass());
      completed.setAttribute("class", getModeClass());
      dispatch(applyFilter(listItems));
      // setDataFilter(() => "all");
      // dispatchAll();
    } else if (element === active) {
      element.setAttribute("class", "list-option list-option-selected");
      all.setAttribute("class", getModeClass());
      completed.setAttribute("class", getModeClass());
      dispatch(applyFilter(listItems.filter((entry) => entry.completed === false)));
      // dispatchActive();
      // setDataFilter(() => "active");
    } else if (element === completed) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", getModeClass());
      all.setAttribute("class", getModeClass());
      dispatch(applyFilter(listItems.filter((entry) => entry.completed === true)));
      // setDataFilter(() => "completed");
      // dispatchCompleted();
    }
  };

  return (
    <div id="todo-list-container">
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
                          completeItem={props.completeItem}
                          listState={dataFilter}
                          deleteItem={props.deleteItem}
                          
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
        data={filteredData}
        listChange={handleListChange}
        clearCompleted={props.clearCompleted}
        
      />
    </div>
  );
}

TodoList.propTypes = {
  data: PropTypes.array,
  reorderData: PropTypes.func,
  completeItem: PropTypes.func,
  clearCompleted: PropTypes.func,
  deleteItem: PropTypes.func,
  mode: PropTypes.string,
};
// require("react-dom");
// window.React2 = require("react");
// console.log(window.React1 === window.React2);