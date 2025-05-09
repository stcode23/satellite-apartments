// stores/useCategoryStore.ts
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Category {
  id: string;
  name: string;
  price: number;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const categoriesData: Category[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
      }));
      set({ categories: categoriesData });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));
