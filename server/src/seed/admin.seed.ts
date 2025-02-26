import Category from "../models/category";

const categories = [
  { _id: "65d4c1e5e3a4b2a6b8e6f8c1", name: "Science" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c2", name: "Physics" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c3", name: "Chemistry" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c4", name: "Mathematics" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c5", name: "History" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c6", name: "Geography" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c7", name: "General Knowledge" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c8", name: "Technology" },
  { _id: "65d4c1e5e3a4b2a6b8e6f8c9", name: "Sports" },
];

const seed = async () => {
  try {
    for (const category of categories) {
      const exists = await Category.findById(category._id);
      if (!exists) {
        await Category.create({ _id: category._id, name: category.name });
        console.log(`Creating category: ${category.name}`);
      } else {
        console.log(`Category ${category.name} already exists`);
      }
    }
  } catch (error) {
    console.error("Category creation error:", error);
  }
};

export default seed;
