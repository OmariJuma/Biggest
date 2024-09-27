const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Sample categories
  const demoCategories = [
    {
      id: "1",
      name: "Clothing & Accessories",
    },
    {
      id: "2",
      name: "Electronics",
    },
    {
      id: "3",
      name: "Home & Garden",
    },
    {
      id: "4",
      name: "Beauty & Health",
    },
    {
      id: "5",
      name: "Toys & Games",
    },
    {
      id: "6",
      name: "Sports & Outdoors",
    },
    {
      id: "7",
      name: "Pets",
    },
    {
      id: "8",
      name: "Food & Beverages",
    },
    {
      id: "9",
      name: "Home Improvement",
    },
    {
      id: "10",
      name: "Arts & Entertainment",
    },
  ];

  // Insert categories
  for (const category of demoCategories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Sample products
  const demoProducts = [
    {
      slug: "product-1",
      title: "Sample Product 1",
      mainImage:
        "https://placehold.co/400",
      Condition: "New",
      Location: "Warehouse 1",
      price: 100,
      rating: 5,
      description: "This is a sample product",
      manufacturer: "Sample Manufacturer",
      inStock: 10,
      categoryId: "1", // Replace with actual category ID
      subCategory: "Women's Clothing",
      subCategoryId: "11", // Replace with actual subcategory ID
    },
    {
      slug: "product-2",
      title: "Sample Product 2",
      mainImage:"https://placehold.co/400",
      Condition: "Used",
      Location: "Abuja",
      price: 200,
      rating: 4,
      description: "This is another sample product",
      manufacturer: "Another Manufacturer",
      inStock: 5,
      categoryId: "2", // Replace with actual category ID
      subCategory: "Computers & Laptops",
      subCategoryId: "21", // Replace with actual subcategory ID
    },
  ];

  // Insert products
  for (const product of demoProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Demo data inserted successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
