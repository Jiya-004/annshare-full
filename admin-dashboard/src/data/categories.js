// Central Canonical Category List for ANNShare Platform
// All components and stores must pull category names exclusively from this shared dataset.

export const CATEGORIES = [
  { id: "CAT-1", name: "Prepared Meals", icon: "cooked", itemCount: 142, color: "#173F35", description: "Hot & cold prepared meals" },
  { id: "CAT-2", name: "Bakery & Bread", icon: "bakery", itemCount: 98, color: "#B9684D", description: "Fresh bread, cakes & pastries" },
  { id: "CAT-3", name: "Fruits & Veggies", icon: "vegetables", itemCount: 186, color: "#28624D", description: "Fresh seasonal fruits & raw vegetables" },
  { id: "CAT-4", name: "Packaged Food", icon: "packaged", itemCount: 85, color: "#789B82", description: "Sealed shelf-stable items" },
  { id: "CAT-5", name: "Rice & Grains", icon: "grains", itemCount: 64, color: "#A5AD72", description: "Rice, lentils, flour & grains" },
  { id: "CAT-6", name: "Dairy & Pantry", icon: "dairy", itemCount: 54, color: "#9BBCA4", description: "Milk, cheese, butter & pantry staples" },
  { id: "CAT-7", name: "Other Items", icon: "other", itemCount: 29, color: "#E7DDC9", description: "Miscellaneous surplus ingredients" }
];

export const CATEGORY_NAMES = CATEGORIES.map(c => c.name);
