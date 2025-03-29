import Board from "@/components/Board";
import exp from "constants";

const formatTodoForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypeCol]: Todo[] });

  const flatArrayCounted = Object.entries(
    flatArray
  ).reduce((map, [key, value]) => {
    map[key as TypeCol] = value.length;
    return map;
  }, {} as { [key in TypeCol]: number });

  return flatArrayCounted;
};

export default formatTodoForAI;
