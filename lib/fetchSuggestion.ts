import Board from "@/components/Board";
import exp from "constants";
import formatTodoForAI from "./formatTodoForAI";
const fetchSuggestion = async (board: Board) => {
  const todos = formatTodoForAI(board);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todos })
  });
};

export default fetchSuggestion;
