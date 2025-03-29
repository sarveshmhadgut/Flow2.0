interface Board {
  columns: Map<TypeCol, Column>;
}

type TypeCol = "todo" | "inprogress" | "completed";

interface Column {
  id: TypeCol;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdDate: string;
  title: string;
  status: TypeCol;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
