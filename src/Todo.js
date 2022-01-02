import React, { useState, useEffect } from "react";
import { ListInfo } from "./ListInfo";
import { ListItem } from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function Todo(props) {
  return (
    <TodoList
      data={props.data}
      reorder={props.reorderData}
      completeItem={props.completeItem}
      clearCompleted={props.clearCompleted}
      deleteItem={props.deleteItem}
      mode={props.mode}
    />
  );
}

export function TodoList(props) {
  const [dataFilter, setDataFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(props.data);

  const handleOnDragEnd = (result) => {
    const items = Array.from(filteredData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // setFilteredData(items);
    props.reorder(items);
  };

  useEffect(() => {
    if (dataFilter === "all") {
      setFilteredData(() => {
        return props.data;
      });
    } else if (dataFilter === "active") {
      setFilteredData(() => {
        return props.data.filter((entry) => entry.completed === false);
      });
    } else if (dataFilter === "completed") {
      setFilteredData(() => {
        return props.data.filter((entry) => entry.completed === true);
      });
    }
  }, [dataFilter, props.data]);

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
      setDataFilter(() => "all");
    } else if (element === active) {
      element.setAttribute("class", "list-option list-option-selected");
      all.setAttribute("class", getModeClass());
      completed.setAttribute("class", getModeClass());
      setDataFilter(() => "active");
    } else if (element === completed) {
      element.setAttribute("class", "list-option list-option-selected");
      active.setAttribute("class", getModeClass());
      all.setAttribute("class", getModeClass());
      setDataFilter(() => "completed");
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
                          text={filteredData[i].text}
                          index={item.id}
                          completed={filteredData[i].completed}
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
        data={filteredData}
        listChange={handleListChange}
        clearCompleted={props.clearCompleted}
        mode={props.mode}
      />
    </div>
  );
}
