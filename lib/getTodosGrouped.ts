import { database } from "@/appwrite";

export const getTodosGrouped = async (): Promise<Board> => {
  try {
    const data = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODO_COLLECTION_ID!
    );

    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
      if (!acc.has(todo.status)) {
        acc.set(todo.status, { id: todo.status, todos: [] });
      }

      acc.get(todo.status)!.todos.push({
        $id: todo.$id,
        $createdDate: todo.$createdDate,
        title: todo.title,
        status: todo.status,
        ...(todo.image && { image: safeParseJSON(todo.image) as Image })
      });

      return acc;
    }, new Map<TypeCol, Column>());

    const columnTypes: TypeCol[] = ["todo", "inprogress", "completed"];
    for (const columnType of columnTypes) {
      if (!columns.has(columnType)) {
        columns.set(columnType, { id: columnType, todos: [] });
      }
    }

    const sortedColumns = new Map<TypeCol, Column>(
      Array.from(columns.entries()).sort(
        (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
      )
    );

    const board: Board = { columns: sortedColumns };
    return board;
  } catch (error) {
    console.error("Error fetching todos:");
    throw error;
  }
};

const safeParseJSON = (json: string): unknown => {
  try {
    return JSON.parse(json);
  } catch {
    console.error("Invalid JSON string:");
    return null;
  }
};
