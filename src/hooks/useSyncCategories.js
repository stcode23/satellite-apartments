import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const useSyncCategories = () => {
  useEffect(() => {
    const syncProductsWithCategories = async () => {
      try {
        // 1. Fetch all categories
        const categoriesSnapshot = await getDocs(collection(db, "category"));
        const categories = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 2. Fetch all products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 3. Sync product.selectedCategory.name & price with matching category
        for (const product of products) {
          const selectedCategory = product.selectedCategory;

          if (selectedCategory?.id) {
            const matchingCategory = categories.find(
              (cat) => cat.id === selectedCategory.id
            );

            if (
              matchingCategory &&
              (selectedCategory.name !== matchingCategory.name ||
                selectedCategory.price !== matchingCategory.price)
            ) {
              await updateDoc(doc(db, "products", product.id), {
                selectedCategory: {
                  ...selectedCategory,
                  name: matchingCategory.name,
                  price: matchingCategory.price,
                },
              });
            }
          }
        }

        console.log("Products successfully synced with categories.");
      } catch (error) {
        console.error("Error syncing categories with products:", error);
      }
    };

    syncProductsWithCategories();
  }, []);
};

export default useSyncCategories;
