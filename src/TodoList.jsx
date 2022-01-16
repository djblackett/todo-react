import React from "react";
import { PropTypes } from "prop-types";
import { ListInfo } from "./ListInfo";
import { ListItem } from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {useSelector, useDispatch} from 'react-redux';
import { selectDataFilter } from "./features/dataFilter/dataFilterSlice";
import { selectListItems, reorderItems } from "./features/listItems/listItemsSlice";


//todo I think useEffect is redundant here. It is probably causing extra rerenders. If I put all data in redux store
//todo and have a 2nd object of filtered data which gets rendered, I won't need to check with useEffect anymore 

export function TodoList(props) {
  // const [dataFilter, setDataFilter] = useState("all");
  // const [filteredData, setFilteredData] = useState(props.data);

  const listItems = useSelector(selectListItems);
const dispatch = useDispatch();
  
  const dataFilter = useSelector(selectDataFilter);

  console.log(dataFilter);

  const handleOnDragEnd = (result) => {
    const items = Array.from(filteredData());
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderItems(items));
  };

  const filteredData = () => {
    if (dataFilter === "all") {
        return listItems;
    } else if (dataFilter === "active") {
        return listItems.filter((entry) => entry.completed === false);
    } else if (dataFilter === "completed") {
        return listItems.filter((entry) => entry.completed === true);
    } else {
      return [];
    }
  };

  console.log(filteredData());

  const getModeClass = () => {
    return "list-option list-option-unselected-" + props.mode;
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
      // setDataFilter(() => "all");
      // dispatchAll();
    } else if (element === active) {
      element.setAttribute("class", "list-option list-option-selected");
      all.setAttribute("class", getModeClass());
      completed.setAttribute("class", getModeClass());
      // dispatchActive();
      // setDataFilter(() => "active");
    } else if (element === completed) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", getModeClass());
      all.setAttribute("class", getModeClass());
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
              {filteredData().map((item, i) => {
                return (
                  <Draggable
                    key={item.id}
                    index={i}
                    draggableId={item.id}
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
                          mode={props.mode}
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
        data={filteredData()}
        listChange={handleListChange}
        clearCompleted={props.clearCompleted}
        mode={props.mode}
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
