"use client";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";

type ColumnProps = {
  id: TypeCol;
  todos: Todo[];
  index: number;
};

const idToColumn: { [key in TypeCol]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  completed: "Completed"
};

function Column({ id, todos, index }: ColumnProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="m-2"
        >
          <Droppable
            droppableId={id}
            type="card"
            isDropDisabled={false}
            isCombineEnabled={true}
            ignoreContainerClipping={false}
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`text-white p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-400/50" : "bg-gray-900/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumn[id] ?? "Unknown Column"}
                  <span className="flex text-blue-300 bg-blue-900 rounded-full w-7 h-7 text-sm font-normal justify-center items-center">
                    {todos.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.length > 0 ? (
                    todos.map((todo, index) => (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No tasks available</p>
                  )}
                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button className="h-6 w-6 bg-blue-300 rounded-full hover:bg-blue-400 transition">
                      <PlusCircleIcon className="h-7 w-7 text-blue-900 -mx-0.5 -my-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
