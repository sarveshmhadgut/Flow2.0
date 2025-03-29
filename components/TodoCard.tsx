"use client";
import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypeCol;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ todo, innerRef, draggableProps, dragHandleProps }: Props) {
  return (
    <div
      className="bg-black rounded-md p-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <h1 className="text-white">{todo.title}</h1>
    </div>
  );
}

export default TodoCard;
