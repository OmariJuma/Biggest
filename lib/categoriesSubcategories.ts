interface Category{
  id:number;
  name: string;
  subCategories: Subcategory[];
}
interface Subcategory{
  id:number;
  name:string;
}

interface CategoriessubCategories{
  categories: Category[];
}
export const categoriessubCategories:CategoriessubCategories = {
  categories: [
    {
      id: 1,
      name: "Clothing & Accessories",
      subCategories: [
        {
          id: 11,
          name: "Men's Clothing",
        },
        {
          id: 12,
          name: "Women's Clothing",
        },
        {
          id: 13,
          name: "Kids' Clothing",
        },
        {
          id: 14,
          name: "Unisex Clothing",
        },
        {
          id: 15,
          name: "Accessories",
        },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      subCategories: [
        {
          id: 21,
          name: "Computers & Laptops",
        },
        {
          id: 22,
          name: "Components",
        },
        {
          id: 23,
          name: "Phones & Mobile",
        },
        {
          id: 24,
          name: "TV & Video",
        },
        {
          id: 25,
          name: "Audio",
        },
        {
          id: 26,
          name: "Appliances",
        },
      ],
    },
    {
      id: 3,
      name: "Home & Garden",
      subCategories: [
        {
          id: 31,
          name: "Furniture",
        },
        {
          id: 32,
          name: "Home Decor",
        },
        {
          id: 33,
          name: "Kitchen & Dining",
        },
        {
          id: 34,
          name: "Bedding & Bath",
        },
        {
          id: 35,
          name: "Gardening",
        },
      ],
    },
    {
      id: 4,
      name: "Beauty & Health",
      subCategories: [
        {
          id: 41,
          name: "Makeup",
        },
        {
          id: 42,
          name: "Skincare",
        },
        {
          id: 43,
          name: "Hair Care",
        },
        {
          id: 44,
          name: "Bath & Body",
        },
        {
          id: 45,
          name: "Fragrances",
        },
        {
          id: 46,
          name: "Health & Wellness",
        },
      ],
    },
    {
      id: 5,
      name: "Toys & Games",
      subCategories: [
        {
          id: 51,
          name: "Action Figures & Playsets",
        },
        {
          id: 52,
          name: "Dolls & Stuffed Animals",
        },
        {
          id: 53,
          name: "Building Sets & Blocks",
        },
        {
          id: 54,
          name: "Arts & Crafts Supplies",
        },
        {
          id: 55,
          name: "Board Games & Card Games",
        },
        {
          id: 56,
          name: "Outdoor Toys & Sports Equipment",
        },
        {
          id: 57,
          name: "Educational Toys & Games",
        },
      ],
    },
    {
      id: 6,
      name: "Sports & Outdoors",
      subCategories: [
        {
          id: 61,
          name: "Athletic Apparel & Footwear",
        },
        {
          id: 62,
          name: "Sporting Goods",
        },
        {
          id: 63,
          name: "Outdoor Gear",
        },
      ],
    },
    {
      id: 7,
      name: "Pets",
      subCategories: [
        {
          id: 71,
          name: "Pet Food",
        },
        {
          id: 72,
          name: "Pet Supplies",
        },
      ],
    },
    {
      id: 8,
      name: "Food & Beverages",
      subCategories: [
        {
          id: 81,
          name: "Grocery",
        },
        {
          id: 82,
          name: "Specialty Foods",
        },
        {
          id: 83,
          name: "Beverages",
        },
      ],
    },
    {
      id: 9,
      name: "Home Improvement",
      subCategories: [
        {
          id: 91,
          name: "Tools & Hardware",
        },
        {
          id: 92,
          name: "Building Materials",
        },
        {
          id: 93,
          name: "Home Decor",
        },
      ],
    },
    {
      id: 10,
      name: "Arts & Entertainment",
      subCategories: [
        {
          id: 101,
          name: "Musical Instruments",
        },
        {
          id: 102,
          name: "Books & Music",
        },
        {
          id: 103,
          name: "Movies & TV Shows",
        },
        {
          id: 104,
          name: "Arts & Crafts Supplies",
        },
      ],
    },
  ],
};
