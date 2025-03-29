"use client";
import React, { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  const board = useBoardStore((state) => state.board);
  const getBoard = useBoardStore((state) => state.getBoard);
  const setBoardState = useBoardStore((state) => state.setBoardState);
  const updateDB = useBoardStore((state) => state.updateDB);

  useEffect(() => {
    if (!board || board.columns.size === 0) {
      getBoard();
    }
  }, [board, getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns
      });
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns.findIndex(
      ([id]) => id === source.droppableId
    );
    const finishColIndex = columns.findIndex(
      ([id]) => id === destination.droppableId
    );

    if (startColIndex === -1 || finishColIndex === -1) return;

    const startCol: Column = {
      id: columns[startColIndex][0],
      todos: columns[startColIndex][1].todos
    };

    const finishCol: Column = {
      id: columns[finishColIndex][0],
      todos: columns[finishColIndex][1].todos
    };
    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos
      });

      updateDB(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  if (!board || !board.columns || board.columns.size === 0) return;
  const columns = Array.from(board.columns);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        isDropDisabled={false}
        isCombineEnabled={true}
        ignoreContainerClipping={false}
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
