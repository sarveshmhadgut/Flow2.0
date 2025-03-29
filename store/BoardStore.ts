import { database } from "@/appwrite"; // Assuming database is correctly initialized
import { create } from "zustand";

interface BoardState {
  board: Board;
  isLoading: boolean; // Add this property
  getBoard: () => Promise<void>;
  setBoardState: (board: Board) => void;
  updateDB: (todo: Todo, columnId: TypeCol) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>(set => ({
  board: {
    columns: new Map<TypeCol, Column>()
  },
  isLoading: false, // Set initial state for isLoading

  // Fetch board data from API
  getBoard: async () => {
    set({ isLoading: true }); // Set loading state
    try {
      const boardData = await fetch("/api/board") // Assuming this API returns the board data
        .then(res => res.json());

      // Assuming boardData contains a 'columns' key
      set({
        board: {
          columns: new Map(boardData.columns)
        }
      });
    } catch (error) {
      console.error("Error fetching board data:", error);
    } finally {
      set({ isLoading: false }); // Set loading to false after fetch completes
    }
  },

  // Set new board state
  setBoardState: (newState: Board) => set({ board: newState }),

  // Update todo in the database
  updateDB: async (todo: Todo, columnId: TypeCol) => {
    try {
      await database.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODO_COLLECTION_ID!,
        todo.$id,
        {
          title: todo.title,
          status: columnId
        }
      );
    } catch (error) {
      console.error("Error updating document:", error);
    }
  },

  searchString: "",
  setSearchString: (searchString: string) => set({ searchString })
}));
